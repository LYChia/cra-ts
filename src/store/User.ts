import { GetStore } from 'store/ContextStore';
/* import { getUser } from 'webApi/user';
import { User } from 'types/db/user'; */

export interface UserState
{
	/** RFUser 主Key */
	rKey: number;
	rUser: string;
	/** 名稱 */
	rName: string;
	rGroup: string;
	/** 工號 */
	personID: string;
	/** 部門編號 */
	deptNo: string;
	/** 是否已載入 */
	isLoaded: boolean;
	/** 取得使用者資料 */
	getUserData: (callback?: () => void) => void;
	/** set rKey */
	setRKey: (number:number) => void;
}

const getDefault = () =>
{
	return {
		rKey: -1,
		rUser: "",
		rName: "",
		rGroup: "",
		personID: "",
		deptNo: ""
	}
}

const getStore: GetStore = (setState, getState) =>
{
	const setRKey = (number:number) =>
	{
		setState( prev => ({user: {...prev.user, rKey: number}}))
	}

	const getUserData = (callback?:() => void) =>
	{
	}

	return {
		user: {
			...getDefault(),
			isLoaded: false,
			getUserData,
			setRKey
		}
	}
}

export default getStore;