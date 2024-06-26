import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return <div className=' flex-1 flex flex-col container '>{children}</div>;
};

export default layout;
