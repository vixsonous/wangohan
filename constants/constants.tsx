
export const ERR_MSG = {
    'ERR1': 'ユーザーが見つかりません。', // User not found!
    'ERR2': 'メールアドレスまたはパスワードを入力してください。', //Please input email or password!
    'ERR3': 'ユーザーIDが未定義です。', // User id is undefined!
    'ERR4': 'ユーザーの詳細が見つかりません。', // User details not found!
    'ERR5': '電子メールは空です。', // Email is empty!
    'ERR6': 'ユーザーはすでに存在します', // User already exist!
    'ERR7': 'メールアドレスとパスワードを入力してください。', // please input email and password
    'ERR8': 'メールアドレスまたはパスワードが空です。', // email or password is empty
    'ERR9': 'パスワードが間違っています。', // Password is incorrect
    'ERR10': 'ログインしてください。', // Please log in
    'ERR11': 'フォームデータが存在しません。', // form data does not exist
}

export const fontSize = {
    'l0': '0.25em', // 1/4 16px
    'l1': '0.5em', // 1/2 16px
    'l2': '0.75em', // 3/4 16px
    'l3': '1em', // 1 16px
    'l4': '1.25em', // 1.25 16px
    'l5': '1.5em', // 1.5 16px
    'l6': '1.75em', // 1.75 16px
    'l7': '2em', // 2 16px
    'l8': '2.25em', // 2.25 16px
    'l9': '2.5em', // 2.5 16px
    'l10': '2.75em', // 2.75 16px
    'l11': '3em', // 3 16px
}

export const getExpireDate = () => {
    // 10 minutes (last number is minutes)
    return new Date(Date.now() + 60 * 1000 * 10);
}

export const validateEmail = (email:string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const withSpecialCharacters = (string: string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(string);
}