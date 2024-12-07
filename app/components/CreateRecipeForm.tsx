'use client';
import { defineScreenMode, imageFileTypes, POPUPTIME, SUCC_MSG, textColor } from "@/constants/constants";
import { ingredients, instructions } from "@/constants/interface";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { showError, hideError, showSuccess, hideSuccess } from "@/lib/redux/states/messageSlice";
import { hide } from "@/lib/redux/states/recipeSlice";
import { faCheck, faCircleNotch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React, { memo, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Navigation, Thumbs, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {isHeic, heicTo} from 'heic-to';

const initRecipeState = {
    recipeTitle: '',
    recipeDescr: '',
    recipeThumbnail: '/recipe-making/pic-background.webp',
    age: '',
    size: '',
    event: '',
}

export default memo(function CreateRecipeForm() {
  const CardTagSize = '10px';
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [submit, setSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [fileThumbnails, setFileThumbnails] = useState<Array<string>>([]);
  const [recipeInfo, setRecipeInfo] = useState(structuredClone(initRecipeState));

  const [error, setError] = useState({
      title: '',
      descr: '',
      image: '',
      instructions: '',
      ingredients: '',
      generalError: ''
  });

  const [recipeIngredients, setRecipeIngredients] = useState<ingredients[]>([{id: 0, name: '', amount: ''}]);
  const [recipeInstructions, setRecipeInstructions] = useState<instructions[]>([{id: 0,text: ''}]);

  const validationFunc = useCallback(() => {
      let valid = true;
      setError(prev => ({
          ...prev,
          title: '',
          descr: '',
          image: '',
          instructions: '',
          ingredients: '',
          generalError: ''
      }))

      if(recipeInfo.recipeTitle === '') {
          setError(prev => ({...prev, title: 'タイトルを入力してください'}));
          valid = false;
      }
      if(recipeInfo.recipeDescr === '') {
          setError(prev => ({...prev, descr: '内容を入力してください'}));
          valid = false;
      }

      if(files.length === 0) {
          setError(prev => ({...prev, image: '画像を挿入してください'}));
          valid = false;
      }
      
      if(recipeInstructions.length === 0 || recipeInstructions[0].text === '') {
          setError(prev => ({...prev, instructions: '作り方を記入してください'}));
          valid = false;
      }

      recipeIngredients.forEach((inst, idx) => {

          if(inst.name !== '' && inst.amount === '') {
              setError(prev => ({...prev, ingredients: Number(idx + 1) +'分量を記入してください'}));
              valid = false;
          }

          if(inst.name === '' && inst.amount !== '') {
              setError(prev => ({...prev, ingredients: Number(idx + 1) +'材料を記入してください'}));
              valid = false;
          }
      });

      if(recipeIngredients.length === 0 || recipeIngredients[0].amount === '') {
          setError(prev => ({...prev, ingredients: '分量を記入してください'}));
          valid = false;
      }

      if(recipeIngredients.length === 0 || recipeIngredients[0].name === '') {
          setError(prev => ({...prev, ingredients: '材料を記入してください'}));
          valid = false;
      }
      
      return valid;
  },[recipeInfo,recipeIngredients,recipeInstructions, files]);

  const submitFunc = useCallback(async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if(!validationFunc()) return;

      const data2Send = {...recipeInfo, 
          recipeIngredients: recipeIngredients, 
          recipeInstructions: recipeInstructions, 
          fileThumbnailsLength: fileThumbnails.length
      };
      setSubmit(true);
      dispatch(hide());
      if(window.location.pathname !== "/") router.push("/");

      const recipe_id = await fetch('/api/recipe', {
          method: 'POST',
          body: JSON.stringify(data2Send),
      }).then(async res => {
          const body = await res.json()
          if(res.status === 500) {
              throw new Error(body.message);
          } else if(res.status === 200) {
              return body;
          }
          
      }).catch(err => {
          const msg = (err as Error).message;
          setError(prev => ({...prev, generalError: msg}));
          setSubmit(false);
          dispatch(showError(msg));
          setTimeout(() => {
              dispatch(hideError());
          }, POPUPTIME);
      });

      if(recipe_id === undefined) return;

      
      files.forEach( async (file, idx) => {
          const filesForm = new FormData();
          filesForm.append('file', file);
          filesForm.append('recipe_id', recipe_id.body);

          await fetch('/api/upload-recipe-files', {
              method: 'POST',
              body: filesForm
          }).then(async res => {
              const body = await res.json();
              if(res.status === 500) {
                  throw new Error(body.message);
              } else if (res.status === 200 && files.length === (idx + 1) ) {
                // Reset recipe info
                  setRecipeInfo(initRecipeState);
                  setRecipeIngredients([{id: 0, name: '', amount: ''}]);
                  setRecipeInstructions([{id: 0,text: ''}]);
                  setFiles([]);
                  setFileThumbnails([]);

                  dispatch(showSuccess(body.message));
                  setTimeout(() => {
                      dispatch(hideSuccess());
                  }, POPUPTIME);
                  setSubmit(false);
              }
          }).catch(err => {
              const msg = (err as Error).message;
              setError(prev => ({...prev, generalError: msg}));
              dispatch(showError(msg));
              setTimeout(() => {
                  dispatch(hideError());
              }, POPUPTIME);
              setSubmit(false);
          });
      });
  },[recipeInfo,files]);

  const [scMode, setScMode] = useState<number>(0);
  useEffect(() => {
      if(typeof window === 'undefined') return;
      setScMode(defineScreenMode());
      window.addEventListener('resize', () => setScMode(defineScreenMode()));
      return () => {
          window.removeEventListener('resize', () => setScMode(defineScreenMode()));
      };
  },[]);

  const uploadFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if(!e.target.files || !e.target.files[0]) return;

      if(!(imageFileTypes.includes(e.target.files[0].type) || e.target.files[0].name.toLowerCase().endsWith('.heic') || e.target.files[0].name.toLowerCase().endsWith('.heif'))) {
          setError(prev => ({...prev, image: "Only image files are supported!"}));
          return;
      }

      if(files.length >= 5) {
          setError(prev => ({...prev, image: "Maximum 5 images only!"}));
          return;
      }

      if(e.target.files[0].size > 4000000) {
        setError(prev => ({...prev, image: "Maximum 4mb only!"}));
        return;
    }

      const fileName = e.target.files[0].name;
      const fileNameExt = fileName.substring(fileName.lastIndexOf('.') + 1);

      if(await isHeic(e.target.files[0])) {
        const jpeg = await heicTo({
          blob: e.target.files[0],
          type: "image/jpeg",
          quality: 0.5
        });

        console.log(jpeg)
      } else {
        const tempPath = URL.createObjectURL(e.target.files[0]);
        const rFiles = [...files];
        const fileTn = [...fileThumbnails];

        const beforeFile = e.target.files[0];

        rFiles.push(beforeFile);
        fileTn.push(tempPath);
        setFiles([...rFiles]);
        setFileThumbnails([...fileTn]);
      }

      
  },[files]);
  

  const addNewRowDataOnClick = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const nm = e.currentTarget.name;
      
      switch(nm) {
          case 'ingredients':
              setRecipeIngredients(prev => [...recipeIngredients, {name: '', amount: ''} as ingredients]);
              break;
          case 'instructions':
              setRecipeInstructions(prev => [...recipeInstructions, {text:''} as instructions])
              break;
      }
  },[recipeIngredients, recipeInstructions]);

  const updateDescrTitleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const nm = e.currentTarget.name;
      setRecipeInfo(prev => ({...prev, [nm]: e.target.value}))
  },[recipeInfo.recipeTitle, recipeInfo.recipeDescr]);

  const slidesPerViewCondition = scMode <= 1 ? fileThumbnails.length < 2 ? 1 : 2 : fileThumbnails.length <= 4 ? fileThumbnails.length : 4;

  const deleteFile = useCallback((e: React.MouseEvent<SVGElement>) => {
      const idx = Number(e.currentTarget.id.split("-")[1]);
      const newFiles = [...files].filter( (f, i) => i !== idx);
      const newThumbnails = [...fileThumbnails].filter( (f, i) => i !== idx);
      setFileThumbnails([...newThumbnails]);
      setFiles([...newFiles]);
  },[files, fileThumbnails]);

  const deleteIngrInsOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const t = e.currentTarget.id;
      const idx = Number(t.split("-")[2]);
      const typ = t.split("-")[0];

      e.preventDefault();

      if(typ === "ingredients") {
          recipeIngredients.splice(idx, 1)
          setRecipeIngredients([...recipeIngredients])
      } else {
          recipeInstructions.splice(idx, 1)
          setRecipeInstructions([...recipeInstructions])
      }

  },[recipeIngredients, recipeInstructions]);

  const changeIngredientsOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const t = e.currentTarget;
      const name = t.id.split("-")[0];
      const idx = Number(t.id.split("-")[1]);

      const prevArr = [...recipeIngredients] as ingredients[];
      if(name === "name" || name === "amount") {
          prevArr[idx][name] = t.value;
      }
      setRecipeIngredients([...prevArr]);
  },[recipeIngredients]);

  const categoryOnClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      const t = e.currentTarget;
      const name = t.name;
      setRecipeInfo(prev => ({...prev, [name]: t.value !== recipeInfo[name as keyof typeof recipeInfo] ? t.value : ''}))
  },[recipeInfo]);

  const categoryOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const t = e.currentTarget;
      const name = t.name;
      setRecipeInfo(prev => ({...prev, [name]: t.value}))
  },[recipeInfo]);

  const onKeyEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
    
    if(e.key === "Enter") {
      e.preventDefault();
      // const d = e.currentTarget;
      // if(d.name === "recipeTitle") {
      //   const t = (document.querySelector('textarea[name="recipeDescr"]') as HTMLTextAreaElement);
      //   t.focus();
      // }else if(d.name.includes("recipe-ingredient-name")) {
      //   e.preventDefault();
      //   const x = d.name.split("-")[3];
      //   (document.querySelector(`input[name="recipe-ingredient-amt-${x}"]`) as HTMLInputElement).focus();
      // }else if(d.name.includes("recipe-ingredient-amt")) {
      //   e.preventDefault();
      //   const x = d.name.split("-")[3];
      //   if(document.querySelector(`input[name="recipe-ingredient-amt-${parseInt(x) + 1}"]`)) {
      //     (document.querySelector(`input[name="recipe-ingredient-name-${parseInt(x) + 1}"]`) as HTMLInputElement).focus();
      //   } else {
      //     (document.querySelector("button[name='ingredients']") as HTMLButtonElement).click();
      //     setTimeout(() => {
      //       (document.querySelector(`input[name="recipe-ingredient-name-${parseInt(x) + 1}"]`) as HTMLInputElement).focus();
      //     },5);
      //   }
      // }else if(d.name.includes("recipe-instructions")) {
      //   e.preventDefault();
      //   const x = d.name.split("-")[2];
      //   if(document.querySelector(`input[name="recipe-instructions-${parseInt(x) + 1}"]`)) {
      //     (document.querySelector(`input[name="recipe-instructions-${parseInt(x) + 1}"]`) as HTMLInputElement).focus();
      //   } else {
      //     (document.querySelector("button[name='instructions']") as HTMLButtonElement).click();
      //     setTimeout(() => {
      //       (document.querySelector(`input[name="recipe-instructions-${parseInt(x) + 1}"]`) as HTMLInputElement).focus();
      //     },5);
      //   }
      // }
    }
  } 

  return (
      <div className="w-full flex justify-center items-center h-full max-w-screen">
        <form action="" className="create-form flex flex-wrap justify-between gap-8 max-w-xl h-[100%] w-full">
          <div className="flex justify-start flex-wrap gap-8 lg:gap-0 flex-[0_0_100%] lg:flex-[0_0_35%] lg:-mt-8">
            <div className="flex-[0_0_100%] self-center">
                <label htmlFor="recipeTitle" aria-required className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピタイトル</h1>
                    <span className={`text-[.75em] self-center font-semibold ${ 25 - recipeInfo.recipeTitle.length < 0 ? `text-[${textColor.error}]` : ''}`}>（{25 - recipeInfo.recipeTitle.length}{25 - recipeInfo.recipeTitle.length >= 0 ? `文字以内` : `文字オーバーしています`}）</span>
                    <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.title}</span>
                </label>
                <input value={recipeInfo.recipeTitle} name="recipeTitle" onKeyDown={onKeyEnter} onChange={updateDescrTitleOnChange} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" id="recipe-title" />
            </div>

            <div className="flex-[0_0_100%] self-start">
                <label htmlFor="recipeDescr" className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピの説明</h1>
                    <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.descr}</span>
                </label>
                <textarea value={recipeInfo.recipeDescr} name="recipeDescr" onChange={updateDescrTitleOnChange} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5} id="recipe-description" />
            </div>
          </div>

          <div className="items-center flex-[0_0_100%] lg:flex-[0_0_55%] mt-[15%] lg:mt-16 w-[100%]">
              <label htmlFor="recipe-image" className="flex relative">
                  <img src={'/recipe-making/3dogs.webp'} loading="lazy" className="top-[-23.2%] left-[10%] absolute h-[auto] w-[30%] max-w-none rounded-[25px]" width={100} height={100}  alt="website banner" />
                  <img src={recipeInfo.recipeThumbnail} loading="lazy" className="h-[auto] w-[100%] max-w-none rounded-[25px]" width={100} height={100}  alt="website banner" />
                  <h1 className="absolute w-[100%] flex flex-col justify-center items-center h-[100%] text-[16px] sm:text-[26px] text-center">料理の画像をアップロード
                  <br/> （横長or正方形推奨）<br /> <span className="text-[36px] required">+</span></h1>
                  <input onChange={uploadFile} className="w-full hidden" type="file" name="recipe-image" id="recipe-image" />
              </label>
              <div className="w-full flex justify-center">
                <div className='mx-auto flex justify-center p-[5px] m-[0] lg:w-[78%] max-w-[100%]'>
                    <Swiper
                        slidesPerView={slidesPerViewCondition}
                        modules={[ Virtual, Navigation, Thumbs]}
                        spaceBetween={5}
                        pagination={{
                            type: 'fraction',
                        }}
                        className="h-[100%] w-[100%] rounded-md"
                        virtual
                    >
                        {
                            fileThumbnails.map((img, idx) => {
                                return (
                                    <SwiperSlide key={img} virtualIndex={idx} className="relative pt-[20px] w-[100%] h-[100%] overflow-visible">
                                        <img src={img} className="object-cover w-[100%] h-[130px] relative rounded-[0px]" width={100} height={100}  alt="website banner" />
                                        <FontAwesomeIcon id={`del-${idx}`} onClick={deleteFile} icon={faTrash} size="sm" style={{color: '#523636'}} className="absolute p-[5px] bg-[#FFFAF0] opacity-[0.8] rounded-xl top-[10px] right-[0px]"/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
              </div>
              <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.image}</span>
          </div>

          <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
              <label htmlFor="recipe-ingredient-name-0" className="flex items-center gap-[5px]">
                  <h1 className="font-semibold text-[1.3em] required">材料・分量</h1>
                  <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.ingredients}</span>
              </label>
              {recipeIngredients.map((el, idx) => {
                  return (
                      <div key={idx}>
                          <div className="flex gap-[15px]">
                              <input onKeyDown={onKeyEnter} value={recipeIngredients[idx].name} id={`name-${idx}`} onChange={changeIngredientsOnChange} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} />
                              <input onKeyDown={onKeyEnter} value={recipeIngredients[idx].amount} id={`amount-${idx}`} onChange={changeIngredientsOnChange} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipe-ingredient-amt-${idx}`} />
                              <button aria-label="delete-ingredients-button" id={`ingredients-del-${idx}`} onClick={deleteIngrInsOnClick}>
                                  <FontAwesomeIcon icon={faTrash} size="sm" style={{color: '#523636'}} className="opacity-[1] rounded-xl"/>
                              </button>
                          </div>
                      </div>
                  )
              })}
              <button aria-label="add-ingredients-button" onClick={addNewRowDataOnClick} name="ingredients" className="text-[13px] self-start cursor-pointer">＋追加</button>
          </div>
          <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
              <label htmlFor="recipe-instructions-0" className="flex items-center gap-[5px]">
                  <h1 className="font-semibold text-[1.3em] required">作り方</h1>
                  <span className="text-[.75em] ml-[5px] font-semibold text-[#E53935]">{error.instructions}</span>
              </label>
              {recipeInstructions.map((el, idx) => {
                  return (
                      <div key={idx}>
                          <div className="flex gap-[15px] justify-between items-center">
                              <span className="ml-[10px] flex justify-center items-center rounded-xl relative">{idx + 1}
                                  <div className="border-[1px] border-black absolute h-[25px] w-[25px] rounded-[35px]"></div>
                              </span>
                              <input onKeyDown={onKeyEnter} value={recipeInstructions[idx].text} onChange={(e) => {
                                  const prevArr = [...recipeInstructions];
                                  prevArr[idx].text = e.target.value;
                                  setRecipeInstructions([...prevArr]);
                              }} className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name={`recipe-instructions-${idx}`} id={`recipe-instructions-${idx}`} />
                              <button aria-label="delete-instructions-button" id={`instructions-del-${idx}`} onClick={deleteIngrInsOnClick}>
                              <FontAwesomeIcon icon={faTrash} size="sm" style={{color: '#523636'}} className="opacity-[1] rounded-xl"/></button>
                          </div>
                      </div>
                  )
              })}
              <button aria-label="add-instructions-button" name="instructions" onClick={addNewRowDataOnClick} className="text-[13px] self-start cursor-pointer">＋追加</button>
          </div>
          <div className="flex-[0_0_100%]">
              <label htmlFor="recipe-category" className="flex">
                  <h1 className="font-semibold text-[1.3em]">カテゴリー<small className="text-[.5em]">(任意)</small></h1>
              </label>
              <div className="ml-[1px] flex flex-wrap" id="recipe-category">
                  <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                      <span className="text-[13px] text-[grey]">年齢を選択</span>
                      <div className="flex gap-[5px] flex-wrap items-center">
                          {
                              ['子犬', '成犬', 'シニア犬'].map((el, idx) => {
                                  return (
                                      <React.Fragment key={idx}>
                                      <input className="hidden" type="radio" checked={recipeInfo.age === el} onClick={categoryOnClick} onChange={categoryOnChange} name="age" value={el} id={el} />
                                      <label htmlFor={el}>
                                          <span className={`cursor-pointer bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                      </label>
                                      </React.Fragment>
                                  )
                              })
                          }
                          </div>
                  </div>
                  <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                      <span className="text-[13px] text-[grey]">サイズを選択</span>
                      <div className="flex gap-[5px] flex-wrap items-center">
                          {
                              ['小型犬','中型犬','大型犬'].map( (el, idx) => {
                                  return (
                                      <React.Fragment key={idx}>
                                      <input checked={recipeInfo.size === el} onClick={categoryOnClick} onChange={categoryOnChange} className="hidden" type="radio" name="size" id={el} value={el} />
                                      <label htmlFor={el}>
                                          <span className={`cursor-pointer bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                      </label>
                                      </React.Fragment>
                                  )
                              } )
                          }
                      </div>
                  </div>
                  <div className={` mt-[10px] w-[100%] flex flex-col gap-[5px] flex-wrap `}>
                      <span className="text-[13px] text-[grey]">イベントを選択</span>
                      <div className="flex gap-[5px] flex-wrap items-center">
                          {
                              ['お誕生日','おうち記念日','お正月','節分','ひな祭り',
                                  'こどもの日','七夕','ハロウィン','クリスマス','おやつ','その他'].map( (el, idx) => {
                                      return (
                                          <React.Fragment key={idx}>
                                              <input checked={recipeInfo.event === el} onClick={categoryOnClick} onChange={categoryOnChange} className="hidden" type="radio" name="event" id={el} value={el} />
                                              <label htmlFor={el}>
                                                  <span className={`cursor-pointer bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                              </label>
                                          </React.Fragment>
                                      )
                                  })
                          }
                      </div>
                  </div>
              </div>
          </div>
          <div className="w-full flex justify-center flex-col text-center">
              <button aria-label="create-recipe-button" disabled={submit} onClick={submitFunc} className={`bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center ${submit ? 'opacity-50' : ''}`} type="submit">   
                  {!submit ? (
                      '作成する'
                  ): (
                    <span className="flex justify-center items-center">
                      <CircleNotch size={20} className="animate-spin"/> 作成する
                    </span>
                  )}
              </button>
              <span className="text-[.75em] font-semibold text-[#E53935]">{error.generalError}</span>
          </div>
        </form>
      </div>
  )
})