'use client';
import { SUCC_MSG, textColor } from "@/constants/constants";
import { ingredients, instructions } from "@/constants/interface";
import { faCheck, faCircleNotch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigation, Thumbs, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType} from "swiper/types";

export default function CreateRecipeForm() {
    const CardFontSize = '13px';
    const CardTagSize = '10px';

    const [submit, setSubmit] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [imgKey, setImgKey] = useState(0);
    const [files, setFiles] = useState<Array<File>>([]);
    const [fileThumbnails, setFileThumbnails] = useState<Array<string>>([]);
    const [recipeInfo, setRecipeInfo] = useState({
        recipeTitle: '',
        recipeDescr: '',
        recipeThumbnail: '/recipe-making/pic-background.png',
        age: '',
        size: '',
        event: '',
    });
    const [thumbsSwiper,setThumbsSwiper] = useState<SwiperType>();

    const [error, setError] = useState({
        title: '',
        descr: '',
        image: '',
        instructions: '',
        ingredients: '',
        generalError: ''
    });

    const [recipeIngredients, setRecipeIngredients] = useState<ingredients[]>([{name: '', amount: ''}]);
    const [recipeInstructions, setRecipeInstructions] = useState<instructions[]>([{text: ''}]);

    const validationFunc = () => {
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
    }

    const submitFunc = async (e:SyntheticEvent) => {
        e.preventDefault();

        if(!validationFunc()) return;

        const data2Send = {...recipeInfo, recipeIngredients: recipeIngredients, recipeInstructions: recipeInstructions, fileThumbnailsLength: fileThumbnails.length};
        setSubmit(true)

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
            setError(prev => ({...prev, generalError: (err as Error).message}));
            setSubmit(false);
        });

        if(recipe_id === undefined) {
            setError(prev => ({...prev, generalError: 'The recipe was not created! Please refresh'}));
            setSubmit(false);
        }

        const filesForm = new FormData();
        files.forEach(file => {
            filesForm.append('files[]', file);
        });
        filesForm.append('recipe_id', recipe_id.body);

        await fetch('/api/upload-recipe-files', {
            method: 'POST',
            body: filesForm
        }).then(async res => {
            const body = await res.json();
            if(res.status === 500) {
                throw new Error(body.message);
            } else if (res.status === 200) {
                // window.location.href = "/";
                setSubmitSuccess(true);
            }
        }).catch(err => {
            setError(prev => ({...prev, generalError: (err as Error).message}));
            setSubmit(false);
        });
    }

    return (
        <form action="" className="create-form flex flex-wrap gap-[30px] max-w-[768px]">
            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-title" aria-required className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピタイトル</h1>
                    <span className={`text-[.75em] self-center font-semibold ${ 25 - recipeInfo.recipeTitle.length < 0 ? `text-[${textColor.error}]` : ''}`}>（{25 - recipeInfo.recipeTitle.length}{25 - recipeInfo.recipeTitle.length >= 0 ? `文字以内` : `文字オーバーしています`}）</span>
                    <span className="ml-[5px] text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.title}</span>
                </label>
                <input value={recipeInfo.recipeTitle} onChange={(e) => setRecipeInfo(prev => ({...prev, recipeTitle: e.target.value}))} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-description" className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピの説明</h1>
                    <span className="ml-[5px] text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.descr}</span>
                </label>
                <textarea value={recipeInfo.recipeDescr} onChange={(e) => setRecipeInfo(prev => ({...prev, recipeDescr: e.target.value}))} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5} name="recipe-description" id="recipe-description" />
            </div>

            <div className="flex-[0_0_100%] mt-[15%] w-[100%]">
                <label htmlFor="recipe-image" className="flex relative">
                    <img src={'/recipe-making/3dogs.png'} className="top-[-23.2%] left-[10%] absolute h-[auto] w-[30%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <img src={recipeInfo.recipeThumbnail} className="h-[auto] w-[100%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <h1 className="absolute w-[100%] flex flex-col justify-center items-center h-[100%] text-[16px] sm:text-[26px] text-center">料理の画像をアップロード
                    <br/> （横長推奨）<br /> <span className="text-[36px] required">+</span></h1>
                    <input onChange={(e) => {
                        if(e.target.files && e.target.files[0]) {
                            const tempPath = URL.createObjectURL(e.target.files[0]);
                            // setRecipeInfo(prevState => ({...prevState, recipeThumbnail:tempPath}));
                            // setImgKey(new Date().getTime() * Math.random());
                            const rFiles = [...files];
                            const fileTn = [...fileThumbnails];
                            rFiles.push(e.target.files[0]);
                            fileTn.push(tempPath);
                            setFiles([...rFiles]);
                            setFileThumbnails([...fileTn]);
                        }
                    }} className="w-[100%] hidden" type="file" name="recipe-image" id="recipe-image" />
                </label>
                <div className='p-[5px] m-[0] w-[90vw] max-w-[768px]'>
                    <Swiper
                        onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
                        slidesPerView={fileThumbnails.length < 3 ? fileThumbnails.length : 3}
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
                                    <SwiperSlide key={img} virtualIndex={idx} className="relative w-[100%] h-[100%] relative overflow-visible">
                                        <img src={img} className="object-cover w-[100%] h-[100px] relative rounded-[0px]" width={10000} height={10000}  alt="website banner" />
                                        <FontAwesomeIcon onClick={() => {
                                            const newFiles = [...files].filter( (f, i) => i !== idx);
                                            const newThumbnails = [...fileThumbnails].filter( (f, i) => i !== idx);
                                            setFileThumbnails([...newThumbnails]);
                                            setFiles([...newFiles]);
                                        }} icon={faTrash} size="sm" style={{color: textColor.error}} className="absolute p-[5px] bg-black opacity-[0.7] rounded-md bottom-[10px] right-[10px]"/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
                <span className="ml-[5px] text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.image}</span>
            </div>

            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-ingredient-name-0" className="flex items-center gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">材料・分量</h1>
                    <span className="ml-[5px] text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.ingredients}</span>
                </label>
                {recipeIngredients.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px]">
                                <input value={recipeIngredients[idx].name} onChange={(e) => {
                                    const prevArr = [...recipeIngredients];
                                    prevArr[idx].name = e.target.value;
                                    setRecipeIngredients([...prevArr]);
                                }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                                <input value={recipeIngredients[idx].amount} onChange={(e) => {
                                    const prevArr = [...recipeIngredients];
                                    prevArr[idx].amount = e.target.value;
                                    setRecipeIngredients([...prevArr]);
                                }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipe-ingredient-amt-${idx}`} id={`recipe-ingredient-amt-${idx}`} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    recipeIngredients.splice(idx, 1)
                                    setRecipeIngredients([...recipeIngredients])
                                }}><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg></button>
                            </div>
                        </div>
                    )
                })}
                <span onClick={(e: SyntheticEvent) => setRecipeIngredients(prev => [...recipeIngredients, {name: '', amount: ''} as ingredients])} className="text-[13px] self-start cursor-pointer">＋追加</span>
            </div>
            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-instructions-0" className="flex items-center gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">作り方</h1>
                    <span className="text-[.75em] ml-[5px] text-[#7f7464] font-semibold text-[#E53935]">{error.instructions}</span>
                </label>
                {recipeInstructions.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px] justify-between items-center">
                                <span className="ml-[10px] flex justify-center items-center rounded-xl relative">{idx + 1}
                                    <div className="border-[1px] border-black absolute h-[25px] w-[25px] rounded-[35px]"></div>
                                </span>
                                <input value={recipeInstructions[idx].text} onChange={(e) => {
                                    const prevArr = [...recipeInstructions];
                                    prevArr[idx].text = e.target.value;
                                    setRecipeInstructions([...prevArr]);
                                }} className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name={`recipe-instructions-${idx}`} id={`recipe-instructions-${idx}`} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    recipeInstructions.splice(idx, 1)
                                    setRecipeInstructions([...recipeInstructions])
                                }}><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg></button>
                            </div>
                        </div>
                    )
                })}
                <span onClick={(e: SyntheticEvent) => setRecipeInstructions(prev => [...recipeInstructions, {text:''} as instructions])} className="text-[13px] cursor-pointer">＋追加</span>
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
                                        <input className="hidden" type="radio" checked={recipeInfo.age === el} onClick={(e) => setRecipeInfo(prev => ({...prev, age: (e.target as HTMLInputElement).value !== recipeInfo.age ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, age: e.target.value}))} name="age" value={el} id={el} />
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
                                        <input checked={recipeInfo.size === el} onClick={(e) => setRecipeInfo(prev => ({...prev, size: (e.target as HTMLInputElement).value !== recipeInfo.size ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, size: e.target.value}))} className="hidden" type="radio" name="size" id={el} value={el} />
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
                                                <input checked={recipeInfo.event === el} onClick={(e) => setRecipeInfo(prev => ({...prev, event: (e.target as HTMLInputElement).value !== recipeInfo.event ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, event: e.target.value}))} className="hidden" type="radio" name="event" id={el} value={el} />
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
                <button disabled={submit} onClick={e => submitFunc(e)} className="bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center" type="submit">   
                    {!submit ? (
                        '作成する'
                    ): (
                        submitSuccess ? <><span style={{color: textColor.success}}>{SUCC_MSG.SUCCESS1} </span><FontAwesomeIcon icon={faCheck} style={{color: textColor.success}} size="lg"/></> 
                        :<FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                    )}
                </button>
                <span className="text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.generalError}</span>
            </div>
        </form>
    )
}