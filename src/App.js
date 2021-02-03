import React, {useState, useEffect} from 'react';
import axios from 'axios';
function App() {
  const [emp,update] = useState({EmpNo:0,EmpName:'',DeptName:''});
  const [emps, add] = useState([]);

  useEffect(()=>{
    axios.get("https://v0yip3ygbb.execute-api.ap-south-1.amazonaws.com/production/api/employees")
        .then((resp)=> {
          add(resp.data);
        }).catch((error)=>{
          console.log(`Error Occured ${error.message}`);
        });
  },[]);

  const save=()=>{
    // add([...emps, {
    //   EmpNo:emp.EmpNo, EmpName:emp.EmpName, DeptName: emp.DeptName
    // }]);
    const e = {
       EmpNo: emp.EmpNo, EmpName: emp.EmpName, DeptName: emp.DeptName
    };
    axios.post("https://v0yip3ygbb.execute-api.ap-south-1.amazonaws.com/production/api/employees", e, {
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then((resp)=> {
      add(resp.data);
    }).catch((error)=>{
      console.log(`Error Occured ${error.message}`);
    });
  };

  const clear=()=>{
    update({EmpNo:0,EmpName:'',DeptName:''});
  };
  return (
    <div className="App">
      <h1>The React.js App Comminucating to Node.js Serverless on AWS</h1>
        <table>
          <tr>
            <td>
              EmpNo
            </td>
            <td>
              <input type="text" value={emp.EmpNo}
               onChange={(evt)=> {update({...emp, EmpNo:parseInt(evt.target.value)})}}/>
            </td>
          </tr>
          <tr>
            <td>
              EmpName
            </td>
            <td>
              <input type="text" value={emp.EmpName}
              onChange={(evt)=> {update({...emp, EmpName:evt.target.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              DeptName
            </td>
            <td>
              <input type="text" value={emp.DeptName}
              onChange={(evt)=> {update({...emp, DeptName:evt.target.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="button" value="Save" onClick={save}/>
            </td>
            <td>
              <input type="button" value="Clear" onClick={clear}/>
            </td>
          </tr>
        </table>
        <hr/>
        <div>
          Received  Data
          <br/>
          {JSON.stringify(emps)}
        </div>
    </div>
  );
}

export default App;
