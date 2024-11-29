import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
    return (
        <React.Fragment>
            <h1 className="font-bold text-[20px]">プライバシーポリシー</h1>
            <span className="text-[10px] mt-[20px]">
                わんごはん（以下，「当サイト」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
            </span>
            <div className="tos-div flex flex-col gap-[15px] text-[10px] mt-[15px]">
                <div>
                    <h1 className="font-bold">第1条（個人情報）</h1>
                    <span>「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</span>
                </div>

                <div>
                    <h1 className="font-bold">第2条（個人情報の収集方法）</h1>
                    <span>当サイトは，ユーザーが利用登録をする際に氏名，生年月日，電話番号，メールアドレスなどの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録に関する情報を,当サイトの提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。</span>
                </div>

                <div>
                    <h1 className="font-bold">第3条（個人情報を収集・利用する目的）</h1>
                    <span>当サイトが個人情報を収集・利用する目的は，以下のとおりです。</span>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>当サイトサービスの提供・運営のため</li>
                        <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                        <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
                        <li>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>
                        <li>ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</li>
                        <li>上記の利用目的に付随する目的</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第4条（利用目的の変更）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>当サイトは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</li>
                        <li>利用目的の変更を行った場合には，変更後の目的について，当サイト所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第5条（個人情報の第三者提供）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>
                        当サイトは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
                            <ol className="list-[lower-alpha] list-outside ml-[20px]">
                                <li>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>
                                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                                <li>
                                    予め次の事項を告知あるいは公表し，かつ当サイトが個人情報保護委員会に届出をしたとき
                                    <ol className="list-[upper-roman] list-outside ml-[20px]">
                                        <li>利用目的に第三者への提供を含むこと</li>
                                        <li>第三者に提供されるデータの項目</li>
                                        <li>第三者への提供の手段または方法</li>
                                        <li>本人の求めに応じて個人情報の第三者への提供を停止すること</li>
                                        <li>本人の求めを受け付ける方法</li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                            <ol className="list-[lower-alpha] list-outside ml-[20px]">
                                <li>当サイトが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                                <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                                <li>個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</li>
                            </ol>
                        </li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第6条（個人情報の開示）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>
                        当サイトは，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。
                            <ol className="list-[lower-alpha] list-outside ml-[20px]">
                                <li>本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</li>
                                <li>当サイトの業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
                                <li>その他法令に違反することとなる場合</li>
                            </ol>
                        </li>
                        <li>前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第7条（個人情報の訂正および削除）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>ユーザーは，当サイトの保有する自己の個人情報が誤った情報である場合には，当サイトが定める手続きにより，当サイトに対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。</li>
                        <li>当サイトは，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</li>
                        <li>当サイトは，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第8条（個人情報の利用停止等）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>当サイトは，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</li>
                        <li>前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</li>
                        <li>当サイトは，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。</li>
                        <li>前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第9条（広告について）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>当サイトは第三者配信の広告サービス「Google Adsense グーグルアドセンス」を利用しています。
                        Googleを含む広告配信事業者は、Cookie を使用して、ユーザーがそのウェブサイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信しています。この目的は、ユーザーがそのサイトや他のサイトにアクセスした際の情報に基づいて、Google やそのパートナーが適切な広告をユーザーに表示するためです。</li>
                        <li>Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「<Link className="text-blue-500 underline" href="https://policies.google.com/technologies/ads?gl=jp">広告 – ポリシーと規約 – Google</Link>」をご覧ください。パーソナライズ広告を無効にする手続きは「<Link className="text-blue-500 underline" href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings">広告設定ーGoogle</Link>」からお手続きください。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第10条（アクセス解析ツールについて）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</li>
                        <li>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは「<Link className="text-blue-500 underline" href="https://marketingplatform.google.com/about/analytics/terms/jp/">Googleアナリティクス利用規約</Link>」をご覧ください。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第11条（プライバシーポリシーの変更）</h1>
                    <ol className="list-decimal list-inside flex flex-col">
                        <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
                        <li>当サイトが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
                    </ol>
                </div>

                <div>
                    <h1 className="font-bold">第12条（お問い合わせ窓口）</h1>
                    <span>本ポリシーに関するお問い合わせは<Link className="text-blue-500 underline" href="/inquiry/send-inquiry">こちら</Link>よりお願いいたします。</span>
                </div>
            </div>
        </React.Fragment>
    )
}