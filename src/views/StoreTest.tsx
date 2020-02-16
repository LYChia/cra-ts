import React, { useContext } from 'react';
import { contextStore } from 'store/ContextStore';
import { Button } from 'reactstrap';

const StoreTest = () => {
    const store = React.useContext(contextStore);

    return <div>
        <div>
            rkey : {store.user.rKey}
        </div>
        <div>
            <Button type="button" onClick={() => { store.user.setRKey(store.user.rKey + 1) }} color="primary">Add</Button>
        </div>
    </div>;
}

export default StoreTest;