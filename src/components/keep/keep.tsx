import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext,
    useMemo,
} from "react";

interface ContextProps {
    (id: string, children: React.ReactNode): Promise<any>
}

const Context = createContext<ContextProps>(null);

type AliveScopeProps = React.PropsWithChildren<{

    }>

    interface AliveScopeState {
    id? : string;
    children?: React.ReactNode
}

interface AliveScopeRef {
    // [key:string] : React.Ref<HTMLDivElement>;
    [key:string] : HTMLDivElement;
}

export function AliveScope(props: AliveScopeProps) {
    const [state, setState] = useState<AliveScopeState>({});
    const ref: AliveScopeRef = useMemo(() => {
        return {};
    }, []);
    const keep = useMemo(() => {
        return (id: string, children: React.ReactNode) =>
            new Promise((resolve) => {
                setState((pre)=>({
                    ...pre,
                    [id]: { id, children },
                }));
                setTimeout(() => {
                    //需要等待setState渲染完拿到实例返回给子组件。
                    resolve(ref[id]);
                });
            });
    }, [ref]);
    return (
        <Context.Provider value={keep}>
            {props.children}
            {Object.values(state).map(({ id, children }): React.ReactNode => (
                <div
                    key={id}
                    ref={(node) => {
                        ref[id] = node;
                    }}
                >
                    {children}
                </div>
            ))}
        </Context.Provider>
    );
}

type KeepAliveProps = React.PropsWithChildren<{
    id: string;
children: React.ReactNode
}>

function KeepAlive(props: KeepAliveProps) {
    const keep = useContext(Context);
    useEffect(() => {
        const init = async ({ id, children }:KeepAliveProps) => {
            const realContent = await keep(id, children);
            if (ref.current) {
                ref.current.appendChild(realContent);
            }
        };
        init(props);
    }, [props, keep]);
    const ref = useRef(null);
    return <div ref={ref} />;
}

export default KeepAlive;
