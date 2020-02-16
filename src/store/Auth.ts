import { GetStore } from 'store/ContextStore';

const notLoginPath = "/login";
const loggedinPath = "/home";
const anonymousPaths = ["/login", "/setpw", "/organization_print"];

/** 是否為可匿名(未登入)使用頁面 */
const getIsAnonymousPath = (currPath: string) => anonymousPaths.some(item => currPath.startsWith(item));

interface SJCPermission
{
	permissionName: string;
	value: string;
}

export interface AuthState
{
	/** 是否讀取中 */
	isLoading: boolean;
	/** 是否已載入驗證資料 */
	isLoaded: boolean;
	/** 是否驗證成功 */
	isAuth: boolean;
	/** 最後驗證時間 */
	lastAuthTime: number;
	/** 暫存 userid */
	tempUserid: string;
	/** 登入頁面自動輸入帳號 */
	autoInputAccount: boolean;
	/** 授權使用頁面 */
	//navList: { items: NavSetting[] };
	/** 路由設定 */
	//routes: RouteSetting[];
	/** 設定自動輸入帳號 */
	setAutoInputAccount: (enable: boolean) => void;
	/** 設定暫存 userid */
	setTempUserid: (userId: string) => void;
	/** 要求驗證資料 */
	requestAuth: (force?:boolean) => void;
	/** 更改驗證狀態 */
	setAuth: (isAuth: boolean) => void;
	/** 登出 預設自動導向登入頁面 */
	logout: (allowRedirect: boolean) => void;
	/** 更新授權使用頁面 */
	updateMenu: () => void;
	/** 驗證資料取得時的觸發行為 */
	onAuthorizing: (isAuth?: boolean) => void;
}

/** 驗證時間間隔 5秒 */
const authInterval = 5000;

const defaultState = () => ({
	isLoading: false,
	isLoaded: false,
	isAuth: false,
	lastAuthTime: 0,
	tempUserid: "",
	autoInputAccount: false,
	navList: { items: [] },
	routes: []
}) as Partial<AuthState>;

const getStore: GetStore = (setState, getState) =>
{
	const updateMenu = async () =>
	{
		/*console.log("更新允許瀏覽的目錄");
		try
		{
			const response = await cFetch("api/Auth/GetMenu", { method: "GET" });
			let result = await (response.json()) as SJCPermission[];

			if (!result.some) result = [];

			const getList = GetAllowNavList(result as any);

			const getRoutes = routes.filter(item =>
			{
				if (item.permission)
				{
					return result.some(subItem => subItem.permissionName === item.permission && subItem.value === "T");
				}
				else
				{
					return true;
				}
			});

			setState((prevState) =>
			{
				return { auth: { ...prevState.auth, navList: getList, routes: getRoutes } }
			});
		}
		catch (e)
		{
			console.error("error occur while fetching menu");
			console.log(e);
		}*/
	}

	const setAutoInputAccount = (enable:boolean) =>
	{
		setState((prevState) => ({ auth: { ...prevState.auth, autoInputAccount: enable}}));
	}

	const setTempUserid = (userId: string) =>
	{
		setState((prevState) => ({ auth: { ...prevState.auth, tempUserid: userId } }));
	}

	const logout = async (allowRedirect: boolean = true) =>
	{
		/* const state = getState();

		setState((prevState) => ({ auth: { ...prevState.auth, isLoading: true, isLoaded: false } }));

		try
		{
			await cFetch("api/Auth/Logout", { method: "GET" });

			setState((prevState) =>
			{
				return { auth: { ...prevState.auth, isLoading: false, isLoaded: true, isAuth: false, lastAuthTime: Date.now(), isAuthBefore: false } }
			});
		}
		catch (e)
		{
			console.error("error occur while fetching auth data");
			console.log(e);
			setState((prevState) => ({ auth: { ...prevState.auth, isLoading: false, isLoaded: true } }));
		}

		const wrapper = { value: () => { } };
		const listenEvent = (location: Location<any>) => 
		{
			if (location.pathname.indexOf("/login") > -1)
			{
				// 取消監聽 history
				wrapper.value();
				state.resetStore((state) => state.auth.requestAuth(true));
			}
		};
		const cancel = state.history.listen(listenEvent);
		wrapper.value = cancel;
		state.history.replace("/login"); */
	}


	const requestAuth = async (force:boolean = false) =>
	{
		/* const state = getState();
		console.log("Request Auth");

		// 防止重複請求
		if (state.auth.isLoading) return;

		// 更新權限資料
		await updateMenu();

		// 間隔時間
		if (!force && (Date.now() - state.auth.lastAuthTime < authInterval))
		{
			console.log("重複驗證間隔時間中");
			return;
		}



		setState((prevState) => ({ auth: { ...prevState.auth, isLoading: true, isLoaded: false } }));

		try
		{
			const url = `api/Auth/GetAuth`;
			const response = await cFetch(url, { method: "GET" });
			const result = await (response.json()) as AuthResult;

			setState((prevState) =>
			{
				return { auth: { ...prevState.auth, isLoading: false, isLoaded: true, isAuth: result.is_auth, lastAuthTime: Date.now() } }
			}, () => { console.log(`auth state updated : isAuth -> ${getState().auth.isAuth}`);});
			onAuthorizing(result.is_auth);
		}
		catch (e)
		{
			console.error("error occur while fetching auth data");
			console.log(e);
			setState((prevState) => ({ auth: { ...prevState.auth, isLoading: false, isLoaded: true, lastAuthTime: Date.now() } }));
			onAuthorizing(false);
		} */
	}

	const setAuth = (isAuth: boolean) =>
	{
		setState(prevState => ({ auth: { ...prevState.auth, isAuth: isAuth, lastAuthTime: Date.now() } }));
	}

	/** 重置 Auth State 值 */
	const resetAuth = () =>
	{
		setState(prevState => ({ auth: { ...prevState.auth, ...defaultState() } }));
	}

	/** 驗證資料取得時的觸發行為 */
	const onAuthorizing = (isAuth?: boolean) =>
	{
		const state = getState();
		if (!state.auth.isLoaded) return;
		isAuth = isAuth === undefined ? getState().auth.isAuth : isAuth;
		const path = state.history.location.pathname;
		const isAnonymousPath = getIsAnonymousPath(path);

		if (isAuth && isAnonymousPath)
		{
			state.history.replace(loggedinPath);
		}

		if (!isAuth && !isAnonymousPath)
		{
			state.history.replace(notLoginPath);
		}
	}

	return {
		auth: {
			...defaultState(),
			setTempUserid,
			requestAuth,
			setAuth,
			logout,
			updateMenu,
			onAuthorizing,
			setAutoInputAccount
		} as AuthState
	}
}

export default getStore;