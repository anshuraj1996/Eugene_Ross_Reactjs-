import React, { useEffect , useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './style.css'

const Home = ({ contacts, deleteContact , onDeleteSelected}) => {
  const[searchBar, setsearchBar] = useState("");
  const [searchedEmp, setSearchedEmp] = useState([]);
  const[contact,setEmp] = useState([]);

  useEffect(()=>{
    if(searchBar.length>0){
      setSearchedEmp(contacts.filter(contacts=>{
        if(contacts.name.toLowerCase().includes(searchBar.toLowerCase())
       
        ){
          return contacts;
        }
      }))
    }else{
      setSearchedEmp(contacts);
    }
 },[searchBar,contacts]);

 const checkClick = (id) =>{
  let allEmp = [...contacts];
  allEmp.forEach(contacts=>{
    if(contacts.id === id){
      contacts.isChecked = !contacts.isChecked;
    }
  })
  setEmp(allEmp);
}


const handleTopCheckBox = (e) => {
  //console.log(e.target.checked)
  if (e.target.checked) {
    contacts.map((x) => !x.isChecked && checkClick(x.id));
  } else {
    contacts.map((x) => x.isChecked && checkClick(x.id));
  }
};
const [anyBoxChecked, setAnyBoxChecked] = useState(false);

const anyBoxCheck = (contacts) => {
  setAnyBoxChecked(
    contacts.reduce((i, member) => i || member.isChecked, false)
  );
};


useEffect(() => {
  anyBoxCheck(contact);
 }, [contact]);

  return (
    <div className="container">
      <div className="row d-flex flex-column">

    <div className="search-box-container">
      <input className="search-box" name="search" value={searchBar}
            onChange={(e) => setsearchBar(e.target.value)}
            placeholder="Search by name... " />
            
    </div> 
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Data
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr >
              < input type="checkbox" onChange={handleTopCheckBox}/>
                <th>SL.No.</th>
              <th>Name</th>
          <th> Category</th>
          <th>  Description</th>
          <th>  Expiry</th>
          <th>Cost price</th>
          <th> Sell price</th>
          <th> Discounts %</th>
          <th>Discount shell price</th>
          <th> Fnal price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}  searchedEmp employees={searchedEmp} checkClick={checkClick}
                
                 >
                    < input type="checkbox" onChange={handleTopCheckBox}/>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.category}</td>
                    <td>{contact.description}</td>
                    <td>{contact.expiry}</td>
                    <td>{contact.costprice}</td>
                    <td>{contact.sellprice}</td>
                    <td>{contact.discounts}</td>
                    <td>{contact.discounts*contact.sellprice/100}</td>
                    <td>{contact.sellprice-contact.discounts*contact.sellprice/100}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No data.</th>
                </tr>
              )}
            </tbody>
          </table>
         
        
        </div>
      </div>
      <button
          className={`dlt-btn${!anyBoxChecked ? " not-active " : ""}`}
          disabled={!anyBoxChecked ? "disabled" : ""}
          onClick={onDeleteSelected}>
            Delete Selected
        </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_DATA", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
