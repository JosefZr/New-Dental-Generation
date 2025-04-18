

export default function Top({top}) {
    return (
        <div className="px-4 flex justify-center pointer-events-none" >	
            <div className="subtitle-container">
                <div className="subtitle">
                    <div className="subtitle-background">
                        <h3>
                        {top}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
