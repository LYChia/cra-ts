import * as React from 'react';
import AuthStore, { AuthState } from 'store/Auth';
import UserStore, { UserState } from 'store/User';
import { History } from 'history';

const context = React.createContext<ContextState>({} as any);

/** APP State集合 */
export interface ContextState
{
	/** 驗證資料 */
	auth: AuthState;
	/** 瀏覽歷程 */
	history: History<any>;
	/** 使用者資料 */
	user: UserState;
	/** 重新初始化 store 資料 */
	resetStore: (onFinish? : (newState:ContextState) => void ) => void;
}

type SetState = <K extends keyof ContextState>(
	state: ((prevState: Readonly<ContextState>, props: Readonly<any>) => (Pick<ContextState, K> | ContextState | null)) | (Pick<ContextState, K> | ContextState | null),
	callback?: () => void
) => void;
type GetState = () => ContextState;
export type GetStore = (setState: SetState, getState: GetState) => Partial<ContextState>;

/** 個別 store 邏輯 */
const stores = [AuthStore, UserStore];

interface LocalProps
{
	history: History<any>;
}

/**
 *  儲存共用狀態的元件
 *  將此元件包在App的外層，底下的子元件就可以透過Context取得共用資料
 */
class ContextStore extends React.Component<LocalProps, ContextState>
{
	constructor(prop: LocalProps)
	{
		super(prop);

		// 將 store 初始化，加入 state
		const _setState = this.setState.bind(this);
		this.state = {} as any;
		stores.forEach((getStore) =>
		{
			let store = getStore(_setState as any, this.getState);
			this.state = { ...this.state, ...store };
		});
		this.state = { ...this.state, history: prop.history, resetStore: this.resetStore };
	}

	/** 取得狀態 */
	public getState = () =>
	{
		return this.state;
	}

	/** 重置 store */
	public resetStore = (onFinish?: (newState: ContextState) => void) =>
	{
		const _setState = this.setState.bind(this);
		let newState = {} as any;
		stores.forEach((getStore) =>
		{
			let store = getStore(_setState as any, this.getState);
			newState = { ...newState, ...store };
		});
		newState = { ...newState, resetStore: this.resetStore };
		this.setState(newState, () => { if (onFinish) onFinish(this.state) });
	}

	public render()
	{
		return <context.Provider value={this.state}>
			{this.props.children}
		</context.Provider>
	}
}

export default ContextStore;
export { context as contextStore }