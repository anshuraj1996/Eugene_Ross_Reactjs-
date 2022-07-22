import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Adddata = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expiry, setExpiry] = useState("");
  const [costprice, setCostPrice] = useState("");
  const [sellprice, setSellPrice] = useState("");
  const [discounts, setDiscounts] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
 

    if (!category || !name || !expiry ){
      return toast.warning("Please fill in all fields!!");
    }
    if (costprice>sellprice){
      return toast.warning('provide correct price')
    }
    
   
    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name,category,expiry,costprice,sellprice,discounts,description
    };

    addContact(data);
    toast.success("Data added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">

      <h1 className="text-center text-dark py-3 display-2">Add Data</h1>
      
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder=" Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder=" Expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder=" Cost price"
                value={costprice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder=" Sell price"
                value={sellprice}
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder=" Discounts %"
                value={discounts}
                onChange={(e) => setDiscounts(e.target.value)}
              />
            </div>
           
          
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add data"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_DATA", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Adddata);
