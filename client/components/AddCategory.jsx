import { useState } from "react";

export default function AddCategory({ isAdmin }) {
  const [category, setCategory] = useState();
  const submitHandler = e => {
    e.preventDefault();
    fetch('/api/add-category', {
      method: 'POST',
      body: JSON.stringify({
        category: category
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        alert(data.msg)
      })
  }
  return (
    <>
      <div className="add-category py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              {isAdmin ?
                <form className="form" onSubmit={submitHandler}>
                  <div className="subtitle">Please Enter Category name</div>
                  <div className="input-container">
                    <input id="category" className="input" type="category" onChange={e => { setCategory(e.target.value) }} placeholder=" " required />
                    <div className="cut"></div>
                    <label htmlFor="category" className="form-placeholder">Category</label>
                  </div>
                  <button type="text" className="btn btn-primary d-block mt-5 w-100">Submit</button>
                </form>
                :
                <h2>Only Admin can add category </h2>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
