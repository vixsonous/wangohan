
export default function ErrorSpan({children} : {children: React.ReactNode}) {
    return (
        <span className="text-[.5em] sm:text-[.75em] font-semibold text-[#E53935]">{children}</span>
    )
}