import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
// import { useNavigate } from "react-router-dom";
// import { redirect } from 'next/navigation';
// import Link from "next/link"; 
// import image1 from "./assets/images/uparrow.png";
// import image2 from "./assets/images/downarrow.png";
import { CSVLink } from "react-csv";

const Listdata = () => {
  const [ans, setAns] = useState([]);
  const [reloadpage, setreloadpage] = useState(false);
  const [currentpage, setCurrentpage] = useState(0);
  const [total, setTotal] = useState(false);
  const [searchdata, setSearchdata] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [dispstatus, setDispstatus] = useState("");
  const [fdata, setFdata] = useState([]);
  // const [filedata, setFiledata] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    setAns(fdata);
  }, [fdata]);

  // const [user, setUser] = useState("");
  // const [search, setSearch] = useState("");
  // const [dateperpage, setDatePerPage] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
  // const [user, setUser] = useState("");
  // const [PageNumber, setPageNumber] = useState("");

  // const usersPerPage = 4;
  // const pagesVisited = pageNumber * usersPerPage;
  // const pageCount = Math.ceil(user.length / usersPerPage);
  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  const handledata = async () => {
    await axios
      .get("/api/listdata")

      .then((res) => {
        setAns(res.data);
        setTotal(Math.ceil(res.data.length / 3));
      });
  };
//   const navigate = useNavigate();
let router= useRouter()

  useEffect(() => {
    handledata();
  }, [reloadpage]);

  const findImageName = (tData) => {
    console.log("bhavya", tData);
    if (tData && tData != "") {
      let ansss = tData.split("/");
      ansss = ansss[ansss.length - 1];
      return ansss;
    } else {
      return "download (1).jpg";
    }
  };

  const handleView = (recid) => {
    // e.preventDefault();
    localStorage.setItem("view_id", recid);
    router.push('/View');
  };

  const handleEdit = (recid) => {
    localStorage.setItem("edit_id", recid);
    router.push("/Editdata");
  };

  const handleDelete = async (recid) => {
    try {
      console.log("Delete data", recid);
      const req = await axios.get("/api/deletedata", {
        params: { recid },
      });
      setreloadpage(!reloadpage);
    } catch (error) {}
  };

  const handleAdd = () => {
    router.push('/Addusers')
  };

  const handleImport = () => {
    router.push("/Importdata");
  };

  const filterFunction = async (e) => {
    e.preventDefault();
    console.log("filter called");
    try {
      const res = await axios.get("/api/filterdata", {
        params: { searchdata, gender, hobbies, dispstatus },
      });
      console.log(res);
      console.log(res.data);
      setFdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortnamea = () => {
    axios.get("/api/sortnamea").then((res) => {
      setAns(res.data);
    });
  };
  const sortnamed = () => {
    axios.get("/api/sortnamed").then((res) => {
      console.log(res.data);
      setAns(res.data);
    });
  };
  const sortdatea = () => {
    axios.get("/api/sortdatea").then((res) => {
      console.log(res.data);
      setAns(res.data);
    });
  };
  const sortdated = () => {
    axios.get("/api/sortdated").then((res) => {
      console.log(res.data);
      setAns(res.data);
    });
  };
  function reset() {
    setSearchdata("");
    setGender("");
    setHobbies("");
    setDispstatus("");
    axios
      .get("/api/filterdata", {
        params: { params: { searchdata, gender, hobbies, dispstatus } },
      })
      .then((res) => {
        const ans = res.data;
        // console.log(ans);
        setFdata(res.data);
      });
    setFilter(false);
  }
  const headers = [
    { label: "Code", key: "code" },
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Hobbies", key: "hobbies" },
    { label: "Country", key: "country" },
    { label: "Photo", key: "photo" },
    { label: "Status", key: "isactive" },
    { label: "DateAdded", key: "dateadded" },
  ];

  return (
    <div>
      <div align="right">
        {filter ? (
          <div>
            <input
              text="text"
              id="search"
              value={searchdata}
              name="search"
              placeholder="search"
              onChange={(e) => {
                setSearchdata(e.target.value);
              }}
            />
            <br></br>
            <label htmlFor="gender">Gender: </label>&nbsp;
            <input
              id="Male"
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label for="Male">Male</label>&nbsp;
            <input
              id="Female"
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label for="Female">Female</label>&nbsp;<br></br>
            <label htmlFor="hobbies">Hobbies</label>&nbsp;
            <select
              id="hobbies"
              type="text"
              name="hobbies"
              onChange={(e) => {
                setHobbies(e.target.value);
              }}
            >
              <option value="select">Select</option>
              <option value="Reading">Reading</option>
              <option value="Travelling">Travelling</option>
              <option value="Cricket">Cricket</option>
              <option value="Music">Music</option>
              <option value="Dancing">Dancing</option>
              <option value="Singing">Singing</option>
            </select>
            <br></br>
            {/* <label htmlFor='Status'>Status</label>&nbsp;
                        <select id='Status' type='text' name='Status' onChange={(e) => {setDispstatus(e.target.value)}}>
                            <option value='select'>Select</option>
                            <option value='Y'>Active</option>
                            <option value='N'>Inactive</option>
                        </select><br></br> */}
            <button onClick={filterFunction}>Filter Data</button>&nbsp;
            <button onClick={reset}>Reset</button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              setFilter(true);
            }}
            className="btn btn-info" style={ {"marginTop": "0rem","marginLeft": "1rem"}}
          >
            Filter
          </button>
        )}
        &nbsp; &nbsp;
        <button className="btn btn-info" style={ {"marginTop": "0rem","marginLeft": "0rem"}}>
          {ans?.length && (
            <CSVLink headers={headers} data={ans} target="_blank">
              Export
            </CSVLink>
          )}
        </button>
        &nbsp;&nbsp;
      </div>
      {/* <input
          type="search"
          placeholder="search"
          value={searchdata}
          onChange={(e) => setSearchdata(e.target.value)}
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
      />
      <button className="btn btn-dark" type="button" onClick={filterFunction}>Search</button> */}

      <button
        type="button"
        value="Add User"
        onClick={() => {
          handleAdd();
        }}
        className="btn btn-dark"
        style={{ marginTop: "0rem", marginLeft: "1rem" }}
      >
        Add User
      </button>
      <button type="button" value="Export" onClick={()=>{handleImport()}} className="btn btn-primary" style={ {"marginTop": "0rem","marginLeft": "1rem"}}>Import</button>
      {/* <button type="button" value="Location" onClick={()=>{handleLocation()}} className="btn btn-info" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>Location</button>  */}
      <table
        className="table table-striped"
        style={{ width: "102vw", marginTop: "1rem", marginLeft: "1rem" }}
      >
        <tbody>
          <tr>
            {/* <th>Recid</th> */}
            <th>Code</th>
            <th>
              <img
                style={{ height: "20px" }}
                onClick={sortnamea}
                // src={image1}
              ></img>
              Name
              <img
                style={{ height: "20px" }}
                onClick={sortnamed}
                // src={image2}
              ></img>
            </th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Photo</th>
            <th>Country</th>
            <th>
              <img
                style={{ height: "20px" }}
                onClick={sortdatea}
                // src={image1}
              ></img>
              Dateadded
              <img
                style={{ height: "20px" }}
                onClick={sortdated}
                // src={image2}
              ></img>
            </th>
            <th>Action</th>
          </tr>
          {ans.slice(currentpage * 3, currentpage * 3 + 3).map((result) => (
            <tr>
              {/* <td>{result.recid}</td> */}
              <td>{result.code}</td>
              <td>{result.firstname}</td>
              <td>{result.lastname}</td>
              <td>{result.email}</td>
              <td>{result.gender}</td>
              <td>{result.hobbies}</td>
              <td>
                <img
                  src={`/api/getimage/${findImageName(
                    result.photo
                  )}`}
                  style={{ height: "100px" }}
                />
              </td>
              <td>{result.country}</td>
              <td>{result.dateadded}</td>
              <td>
                <button
                  type="button"
                  value="View"
                  onClick={() => {
                    handleView(result.recid);
                  }}
                  className="btn btn-primary"
                >
                  View
                </button>
                &nbsp;
                <button
                  type="button"
                  value="Edit"
                  onClick={() => {
                    handleEdit(result.recid);
                  }}
                  className="btn btn-warning"
                >
                  Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  value="Delete"
                  onClick={() => {
                    handleDelete(result.recid);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={currentpage == 0}
        onClick={() => {
          setCurrentpage(currentpage - 1);
        }}
      >
        Prev
      </button>
      <button
        disabled={currentpage + 1 == total}
        style={{ marginTop: "2rem", marginLeft: "1rem" }}
        onClick={() => {
          setCurrentpage(currentpage + 1);
          console.log(currentpage, total);
        }}
      >
        Next
      </button>
    </div>
  );
};
export default Listdata;
