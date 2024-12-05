'use client';
import { defineScreenMode, imageFileTypes, POPUPTIME, SUCC_MSG, textColor } from "@/constants/constants";
import { ingredients, instructions, RecipeData } from "@/constants/interface";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { showError, hideError, showSuccess, hideSuccess } from "@/lib/redux/states/messageSlice";
import { hide } from "@/lib/redux/states/recipeSlice";
import { faCheck, faCircleNotch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect, useRouter } from "next/navigation";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Navigation, Thumbs, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType} from "swiper/types";
import { ingredients as ingredientType } from "@/constants/types";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";

const initRecipeState = {
    recipeTitle: '',
    recipeDescr: '',
    recipeThumbnail: '/recipe-making/pic-background.webp',
    age: '',
    size: '',
    event: '',
}

interface FileObj {
    id: number,
    file: File | null,
    thumbnail: string
}

export default function EditRecipeForm({recipe_data, userId} : {recipe_data: RecipeData, userId: number}) {
    const CardFontSize = '13px';
    const CardTagSize = '10px';
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [state, setState] = useState({
        recipeInfo: {
            recipeId: recipe_data.recipe_id,
            recipeTitle: recipe_data.recipe_name,
            recipeDescr: recipe_data.recipe_description,
            age: recipe_data.recipe_age_tag,
            size: recipe_data.recipe_size_tag,
            event: recipe_data.recipe_event_tag,
            recipeThumbnail: ''
        },
        files: recipe_data.recipe_images.map( img => ({id: img.recipe_image_id, thumbnail: img.recipe_image, file: null} as FileObj)),
        recipeIngredients: recipe_data.recipe_ingredients.map(ingr => ({id: ingr.recipe_ingredient_id, name: ingr.recipe_ingredients_name, amount: ingr.recipe_ingredients_amount} as ingredients)),
        recipeInstructions: recipe_data.recipe_instructions.map(instr => ({id: instr.recipe_instructions_id,text: instr.recipe_instructions_text} as instructions)),
        deletedIds: {
            files: [] as Array<number>,
            ingredients: [] as Array<number>,
            instructions: [] as Array<number>
        }
    });

    const [submit, setSubmit] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [thumbsSwiper,setThumbsSwiper] = useState<SwiperType>();

    const [error, setError] = useState({
        title: '',
        descr: '',
        image: '',
        instructions: '',
        ingredients: '',
        generalError: ''
    });

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

        if(state.recipeInfo.recipeTitle === '') {
            setError(prev => ({...prev, title: 'タイトルを入力してください'}));
            valid = false;
        }
        if(state.recipeInfo.recipeDescr === '') {
            setError(prev => ({...prev, descr: '内容を入力してください'}));
            valid = false;
        }

        if(state.files.length === 0) {
            setError(prev => ({...prev, image: '画像を挿入してください'}));
            valid = false;
        }
        
        if(state.recipeInstructions.length === 0 || state.recipeInstructions[0].text === '') {
            setError(prev => ({...prev, instructions: '作り方を記入してください'}));
            valid = false;
        }

        state.recipeIngredients.forEach((inst, idx) => {

            if(inst.name !== '' && inst.amount === '') {
                setError(prev => ({...prev, ingredients: Number(idx + 1) +'分量を記入してください'}));
                valid = false;
            }

            if(inst.name === '' && inst.amount !== '') {
                setError(prev => ({...prev, ingredients: Number(idx + 1) +'材料を記入してください'}));
                valid = false;
            }
        });

        if(state.recipeIngredients.length === 0 || state.recipeIngredients[0].amount === '') {
            setError(prev => ({...prev, ingredients: '分量を記入してください'}));
            valid = false;
        }

        if(state.recipeIngredients.length === 0 || state.recipeIngredients[0].name === '') {
            setError(prev => ({...prev, ingredients: '材料を記入してください'}));
            valid = false;
        }
        
        return valid;
    }

    const submitFunc = async (e:SyntheticEvent) => {
        e.preventDefault();

        if(!validationFunc()) return;

        const data2Send = {...state.recipeInfo, 
            recipeIngredients: state.recipeIngredients, 
            recipeInstructions: state.recipeInstructions, 
            fileThumbnailsLength: state.files.length
        };

        const files2send = state.files.filter( file => file.file !== null && file.file !== undefined);
        setSubmit(true);

        await fetch('/api/recipe-info', {
            method: 'DELETE',
            body: JSON.stringify(state.deletedIds)
        }).then( async res => {
            const body = await res.json();
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

        const recipe_data = await fetch('/api/recipe', {
            method: 'PUT',
            body: JSON.stringify(data2Send),
        }).then(async res => {
            const body = await res.json()
            if(res.status === 500) {
                throw new Error(body.message);
            } else if(res.status === 200 && files2send.length === 0) {
                dispatch(showSuccess(body.message));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, POPUPTIME);
                setSubmitSuccess(true);
                router.push("/user/" + userId);
            } else if(res.status === 200 && files2send.length > 0) {
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

        if(recipe_data === undefined) return;
        
        files2send.forEach( async (file, idx) => {
            if(file.file) {
                const filesForm = new FormData();
                filesForm.append('file', file.file);
                filesForm.append('recipe_id', String(state.recipeInfo.recipeId));

                await fetch('/api/upload-recipe-files', {
                    method: 'POST',
                    body: filesForm
                }).then(async res => {
                    const body = await res.json();
                    if(res.status === 500) {
                        throw new Error(body.message);
                    } else if (res.status === 200 ) {
                        dispatch(showSuccess(body.message));
                        setTimeout(() => {
                            dispatch(hideSuccess());
                        }, POPUPTIME);
                        setSubmitSuccess(true);
                        router.push("/user/" + userId);
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
            }
        });
    }

    const [scMode, setScMode] = useState<number>(0);
    useEffect(() => {
        if(typeof window === 'undefined') return;
        setScMode(defineScreenMode());
        window.addEventListener('resize', () => setScMode(defineScreenMode()));
        return () => {
            window.removeEventListener('resize', () => setScMode(defineScreenMode()));
        };
        
    },[]);

    const categoryOnClick = (e:SyntheticEvent) => {
        const t = e.currentTarget as HTMLInputElement;
        const id = t.name.split("-")[0];
        setState( prev => ({...prev, recipeInfo: {...prev.recipeInfo, [id]: t.value !== prev.recipeInfo[id as keyof typeof prev.recipeInfo] ? t.value : ''}}))
    }

    const categoryOnChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const t = e.currentTarget;
        setState( prev => ({...prev, recipeInfo: {...prev.recipeInfo, [t.name.split("-")[0]]: e.target.value}}))
    };

    const ingredientsOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        const t = e.currentTarget;
        const ar = t.name.split("-")[0];
        const id = t.name.split("-")[1];
        const idx = Number(t.name.split("-")[2]);
        const rrr = state[ar as keyof typeof state];
        const array = ar === "recipeIngredients" ? rrr as ingredients[] : rrr as instructions[];
        
        if( ar === "recipeIngredients" && Array.isArray(array)) {
            const prevArr = [...array] as ingredients[];
            prevArr[idx][id as keyof {name: string, amount: string}] = t.value;
            setState(prev => ({...prev, [ar as keyof typeof state]: [...prevArr]}));

        } else if( ar === "recipeInstructions" && Array.isArray(array)) {
            const prevArr = [...array] as instructions[];
            prevArr[idx][id as keyof {text: string}] = t.value;
            setState(prev => ({...prev, [ar as keyof typeof state]: [...prevArr]}));

        }
    }

    const ingredientsDeleteOnClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const t = e.currentTarget;
        const n = t.name;
        const ar = t.name.split("-")[0];
        const idx = Number(n.split("-")[2]);

        
        if( ar === "ingredients") {
            const [deleted] = state.recipeIngredients.splice(idx, 1)
            setState(prev => ({
                ...prev, 
                recipeIngredients: [...state.recipeIngredients], 
                deletedIds: {...prev.deletedIds, 
                    ingredients: deleted.id ? [...prev.deletedIds.ingredients,deleted.id ] : [...prev.deletedIds.ingredients]
                }
            }));

        } else if( ar === "instructions") {
            const [deleted] = state.recipeInstructions.splice(idx, 1)
            console.log(idx);
            setState(prev => ({
                ...prev, 
                recipeInstructions: [...state.recipeInstructions], 
                deletedIds: {...prev.deletedIds, 
                    instructions: deleted.id ? [...prev.deletedIds.instructions, deleted.id] : [...prev.deletedIds.instructions]
                }
            }));

        }
    }

    const ingredientsAddOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const t = e.currentTarget;
        const ar = t.name.split("-")[0];

        if( ar === "ingredients") {
            setState(prev => ({...prev, recipeIngredients: [...state.recipeIngredients, {name: '', amount: ''} as ingredients]}));
        } else if( ar === "instructions") {
            setState(prev => ({...prev, recipeInstructions: [...state.recipeInstructions, {text: ''} as instructions]}));
        }
    }

    const fileDeleteOnClick = (e:SyntheticEvent) => {
        e.preventDefault();
        const t = e.currentTarget;
        const idx = Number(t.id.split("-")[1]);
        
        if(state.files[idx].id !== undefined && state.files[idx].id !== -1) {
            setState(prev => ({...prev, deletedIds: { ...prev.deletedIds, files: [...prev.deletedIds.files, state.files[idx].id]}}));
        }

        const af = [...state.files].filter( (_, i) => i !== idx);
        setState(prev => ({...prev, files: [...af]}));
    }

    const fileUploadOnChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const t = e.currentTarget;
        
        if(!t.files || !t.files[0]) return;

        if(!imageFileTypes.includes(t.files[0].type) && t.files[0].type !== "") {
            setError(prev => ({...prev, image: "Only jpeg, png, and webp files are supported!"}));
            return;
        }

        if(t.files[0].type === "" && !imageFileTypes.includes(t.files[0].name.split(".")[1].toLowerCase())) {
            setError(prev => ({...prev, image: "Only jpeg, png, webp, heic, and heif files are supported!"}));
        }

        if(state.files.length >= 5) {
            setError(prev => ({...prev, image: "Maximum 5 images only!"}));
            return;
        }

        const tempPath = URL.createObjectURL(t.files[0]);

        const beforeFile = t.files[0];

        if(beforeFile.size > 4000000) {
            setError(prev => ({...prev, image: "Maximum 4mb only!"}));
            return;
        }

        const fs = [...state.files];
        const f = {
            id: -1,
            thumbnail: tempPath,
            file: beforeFile
        }
        fs.push(f);
        
        setState(prev => ({...prev, files: [...fs]}));
    }

    return (
        <form action="" className="create-form flex flex-wrap gap-[30px] max-w-[768px] h-[100%]">
            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-title" aria-required className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピタイトル</h1>
                    <span className={`text-[.75em] self-center font-semibold ${ 25 - state.recipeInfo.recipeTitle.length < 0 ? `text-[${textColor.error}]` : ''}`}>（{25 - state.recipeInfo.recipeTitle.length}{25 - state.recipeInfo.recipeTitle.length >= 0 ? `文字以内` : `文字オーバーしています`}）</span>
                    <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.title}</span>
                </label>
                <input value={state.recipeInfo.recipeTitle} onChange={categoryOnChange} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipeTitle-edit" id="recipe-title" />
            </div>

            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-description" className="flex items-center flex-wrap gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">レシピの説明</h1>
                    <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.descr}</span>
                </label>
                <textarea value={state.recipeInfo.recipeDescr} onChange={categoryOnChange} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5} name="recipeDescr-edit" id="recipe-description" />
            </div>

            <div className="flex-[0_0_100%] mt-[15%] w-[100%]">
                <label htmlFor="recipe-image-edit" className="flex relative">
                    <img src={'/recipe-making/3dogs.webp'} className="top-[-2.8em] left-[10%] absolute h-[auto] w-[30%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <img src={state.files.length > 0 ? state.files[state.files.length - 1].thumbnail : '/recipe-making/pic-background.webp'} className="h-[auto] w-[100%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <h1 className="absolute w-[100%] flex flex-col justify-center items-center h-[100%] text-[16px] sm:text-[26px] text-center">料理の画像をアップロード
                    <br/> （横長推奨）<br /> <span className="text-[36px] required">+</span></h1>
                    <input onChange={fileUploadOnChange} className="w-[100%] hidden" type="file" name="recipe-image-edit" id="recipe-image-edit" />
                </label>
                <div className='p-[5px] m-[0] w-[90vw] max-w-[768px]'>
                    <Swiper
                        onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
                        slidesPerView={scMode <= 1 ? state.files.length < 2 ? 1 : 2 : state.files.length <= 4 ? state.files.length : 4}
                        modules={[ Virtual, Navigation, Thumbs]}
                        spaceBetween={5}
                        pagination={{
                            type: 'fraction',
                        }}
                        className="h-[100%] w-[100%] rounded-md"
                        virtual
                        >
                        {
                            state.files.map((img, idx) => {
                                return (
                                    <SwiperSlide key={idx} virtualIndex={idx} className="pt-[20px] w-[100%] h-[100%] relative overflow-visible">
                                        <img src={img.thumbnail} className="object-cover w-[100%] h-[130px] relative rounded-[0px]" width={10000} height={10000}  alt="website banner" />
                                        <FontAwesomeIcon onClick={fileDeleteOnClick} icon={faTrash} id={`ft-${idx}`} size="sm" style={{color: '#523636'}} className="absolute p-[5px] bg-[#FFFAF0] opacity-[0.8] rounded-xl top-[10px] right-[0px]"/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
                <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.image}</span>
            </div>

            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-ingredient-name-0" className="flex items-center gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">材料・分量</h1>
                    <span className="ml-[5px] text-[.75em] font-semibold text-[#E53935]">{error.ingredients}</span>
                </label>
                {state.recipeIngredients.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px]">
                                <input value={state.recipeIngredients[idx].name} onChange={ingredientsOnChange} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipeIngredients-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                                <input value={state.recipeIngredients[idx].amount} onChange={ingredientsOnChange} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipeIngredients-amount-${idx}`} id={`recipe-ingredient-amt-${idx}`} />
                                <button onClick={ingredientsDeleteOnClick} name={`ingredients-delete-${idx}`}>
                                    <FontAwesomeIcon icon={faTrash} size="sm" style={{color: '#523636'}} className="opacity-[1] rounded-xl"/>
                                </button>
                            </div>
                        </div>
                    )
                })}
                <button onClick={ingredientsAddOnClick} name={`ingredients-add`} className="text-[13px] self-start cursor-pointer">＋追加</button>
            </div>
            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-instructions-0" className="flex items-center gap-[5px]">
                    <h1 className="font-semibold text-[1.3em] required">作り方</h1>
                    <span className="text-[.75em] ml-[5px] font-semibold text-[#E53935]">{error.instructions}</span>
                </label>
                {state.recipeInstructions.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px] justify-between items-center">
                                <span className="ml-[10px] flex justify-center items-center rounded-xl relative">{idx + 1}
                                    <div className="border-[1px] border-black absolute h-[25px] w-[25px] rounded-[35px]"></div>
                                </span>
                                <input value={state.recipeInstructions[idx].text} onChange={ingredientsOnChange} name={`recipeInstructions-text-${idx}`} className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" id={`recipe-instructions-${idx}`} />
                                <button name={`instructions-delete-${idx}`} onClick={ingredientsDeleteOnClick}>
                                <FontAwesomeIcon icon={faTrash} size="sm" style={{color: '#523636'}} className="opacity-[1] rounded-xl"/></button>
                            </div>
                        </div>
                    )
                })}
                <button onClick={ingredientsAddOnClick} name={`instructions-add`} className="text-[13px] self-start cursor-pointer">＋追加</button>
            </div>
            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-category" className="flex">
                    <h1 className="font-semibold text-[1.3em]">カテゴリー<small className="text-[.5em]">(任意)</small></h1>
                </label>
                <div className="ml-[1px] flex flex-wrap" id="recipe-category">
                    {
                        [
                            {className: " w-[50%] flex flex-col gap-1 flex-wrap", title: "年齢を選択", category: "age", types: ['子犬', '成犬', 'シニア犬']},
                            {className: " w-[50%] flex flex-col gap-1 flex-wrap", title: "サイズを選択", category: "size", types: ['小型犬','中型犬','大型犬']},
                            {className: "mt-2 w-full flex flex-col gap-1 flex-wrap", title: "イベントを選択", category: "event", types: ['お誕生日','おうち記念日','お正月','節分','ひな祭り',
                                    'こどもの日','七夕','ハロウィン','クリスマス','おやつ','その他']},
                        ].map( (cat, idx) => {
                            return (
                                <div key={idx} className={cat.className}>
                                    <span className="text-[13px] text-[grey]">{cat.title}</span>
                                    <div className="flex gap-[5px] flex-wrap items-center">
                                        {
                                            cat.types.map((el, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                    <input className="hidden" type="radio" checked={state.recipeInfo[cat.category as keyof typeof state.recipeInfo] === el} onClick={categoryOnClick} onChange={categoryOnChange} name={`${cat.category}-edit`} value={el} id={`${el}-edit`} />
                                                    <label htmlFor={`${el}-edit`}>
                                                        <span className={`cursor-pointer bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                                    </label>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full flex justify-center flex-col text-center">
                <button disabled={submit} onClick={submitFunc} className="bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center" type="submit">   
                    {!submit ? (
                        '更新する'
                    ): (
                        submitSuccess ? <><span style={{color: textColor.success}}>{SUCC_MSG.SUCCESS1} </span><FontAwesomeIcon icon={faCheck} style={{color: textColor.success}} size="lg"/></> 
                        :<FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                    )}
                </button>
                <ErrorSpan>{error.generalError}</ErrorSpan>
            </div>
        </form>
    )
}