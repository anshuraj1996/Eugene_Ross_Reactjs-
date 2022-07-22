const initialState = [
 // { id: 0, name: "Raman Sharma", category: "Mobile", description: "iphonex" ,expiry:'30/12/2050',costprice:'50000', shellprice:"100000",discounts:'2'},
  
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      state = [...state, action.payload];
      return state;
    case "DELETE_DATA":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_DATA":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, description: null, category: null }];
      return state;
    default:
      return state;
  }
};
