import {ReactNode} from "react";
interface BackgroundProps {
    children: NonNullable<ReactNode>;
    className?: string | undefined;
}
export default function BackgroundContainer({children,className}:BackgroundProps){
    if(className){
        return (
            <div className={className + " min-h-full flex justify-center bg-blue-palette-50"}>
                {children}
            </div>
        );
    }
    return(
        <div className="min-h-full flex justify-center bg-blue-palette-50">
            {children}
        </div>
    );
}