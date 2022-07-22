import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const Editdata = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setCategory(currentContact.category);
    setDescription(currentContact.description);
    setCostPrice(currentContact.costprice);
    setDiscounts(currentContact.discounts);
    setSellPrice(currentContact.sellprice);
    setExpiry(currentContact.expiry);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [costprice, setCostPrice] = useState("");
  const [sellprice, setSellPrice] = useState("");
  const [discounts, setDiscounts] = useState("");
  const [expiry,setExpiry]=useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();
  

    if (!description || !name || !category) {
      return toast.warning("Please fill in all fields!!");
    }

    if (costprice>sellprice){
      return toast.warning('provide correct price')
    }
    
   
    const data = {
      id: currentContact.id,
      name,category,description,expiry,sellprice,costprice,discounts
    };

    updateContact(data);
    toast.success("updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={description}
                  placeholder={"description"}
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
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Datas
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_DATA", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editdata);
