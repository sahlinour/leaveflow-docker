import { COLORS } from '../theme';


export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            style={{ accentColor: COLORS.mid }}
            className={
                'rounded border-slate-300 focus:ring-2 focus:ring-[#3A7CA5]/30 focus:ring-offset-0 ' +
                className
            }
        />
    );
}