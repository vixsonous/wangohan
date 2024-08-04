import React from "react";

export default function DisclaimerPage() {
    return (
        <React.Fragment>
            <h1 className="font-bold text-[20px]">免責事項</h1>
            <span className="text-[10px] mt-[20px]">
                次の事項に関し、たとえ当サイトがその損害発生の可能性を予め通知されていた場合であっても、当サイトは責任を一切負いません。
            </span>
            <ol className="list-decimal mt-[5px] text-[10px] flex flex-col gap-[15px]" type="1">
                <li>当サイトに掲載されている情報は信頼できるデータに基づいておりますが、当サイトその正確性・安全性を保証するものではありません。情報が不正確であったこと、あるいは誤植があったことなどにより生じたいかなる損害に関しても責任を負いません。</li>
                <li>当サイトに含まれる情報もしくは内容を利用することに伴い直接・間接的に生じた損失等に対し、当サイトは何ら責任を負いません。当サイトの情報を使用したことから生じる結果の全ては、使用者自身の責任と負担になります。</li>
                <li>当サイトの内容は、事前に予告することなく、変更、修正し、または削除、閉鎖することがあります。当サイトはこれらについて、何ら責任を負うものではありません。</li>
                <li>当サイト内に設定されたリンク先が外部サイトの場合、その外部サイトの内容について、当サイトはその責任を擁しません。</li>
            </ol>
        </React.Fragment>
    )
}