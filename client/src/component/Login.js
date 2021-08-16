import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login({username, email, password, errors, setUsername, setEmail, setPassword, setErrors, onLogin}) {
    


    let history = useHistory()

    function handleClick() {
        setErrors([])
        // setUsername("")
        // setPassword("")
        history.push('/signup')
    }

    

    async function handleLogin(e) {
        e.preventDefault()
        const credentials = {
            username,
            password
        }
        const res = await fetch("/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(credentials)
        })
        const data = await res.json()
        if (res.ok) {
          onLogin(data)
          history.push("/")
        } else {
            console.log(data)
            setErrors(data.errors)
        }
    }
    return (
        (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                                <div className="card-body p-4 p-md-5" style={{marginBottom: '50px'}}>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">RaPool Login</h3>
                                    <form onSubmit={handleLogin}>
                                        <div className="row ">
                                            <div className="col-md-6 login mb-6" >
    
                                                <div className="form-outline">
                                                    <input type="text" id="username" className="form-control form-control-lg" value={username} onChange={e => setUsername(e.target.value)}/>
                                                    <label className="form-label" htmlFor="firstName">Username</label>
                                                </div>
    
                                                <div className="form-outline">
                                                    <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)}/>
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                </div>
                                            {/* error display */}
                                            {errors ? 
                                            (<div>
                                                {errors.map((error, index)=> (<p style={{color: 'red'}} key={index}>{error}</p>))}
                                            </div>)
                                            : null}
    
                                            </div>
                                            <div className="mt-6 pt-2">
                                                <input className="btn btn-primary btn-lg" type="submit" value="Submit" /> 
                                                <br/>
                                                <br/>
                                                <a  className="link"  onClick={handleClick}>New to RaPool? Create Your Profile!</a>
                                            </div>
    
                                            {/* <div className="mt-4 pt-2">
                                                <input className="btn btn-primary btn-lg" type="button" value="New to BeatMatch? Create Your Profile!" onClick={() => setExistingUser(!existingUser)} />
                                            </div> */}
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )
    )
}

export default Login