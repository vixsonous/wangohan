
export default function ErrorSpan({children} : {children: React.ReactNode}) {
    return (
        <span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{children}</span>
    )
}