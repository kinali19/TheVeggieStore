
export enum ActionTypes {
    Add = '[Product] Add to cart',
    Remove = '[Product] Remove from cart',
    Edit = '[Product] Edit from cart',
    LoadItems = '[Products] Load items from server',
    LoadSuccess = '[Products] Load success',
    QtyUp = '[Product] Quantity Up',
    QtyDown = '[Product] Quantity Down',
  }


export const AddToCart = payload => {
    return {
        type:ActionTypes.Add,
        payload
    }
};

export const GetItems = () => ({
    type: ActionTypes.LoadItems
})

export const RemoveFromCart = payload => ({
    type:ActionTypes.Remove,
    payload
})

export const EditFromCart = payload => ({
    type:ActionTypes.Edit,
    payload
})
export const LoadItems = payload => ({
    type: ActionTypes.LoadSuccess,
    payload
  });

  export const IncreaseQty = payload => ({
    type: ActionTypes.QtyUp,
    payload
  });
  export const DecreaseQty = payload => ({
    type: ActionTypes.QtyDown,
    payload
  });
  
