
const ContentWrapper  = ({children, classname}) => {
    return (
        <div className={`app-main-content-wrapper ${classname ?? ''}`}>{children}</div>
    )
}

export default ContentWrapper;