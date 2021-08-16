import { useHistory } from 'react-router-dom'

function Signup({username, email, password, errors, setUsername, setEmail, setPassword, setErrors, onLogin}) {
    let history = useHistory()

    function handleClick() {
        setErrors([])
        setUsername("")
        setPassword("")
        history.push('/login')
    }

    async function handleSignup(e) {
        e.preventDefault()
        const userData = {
            username,
            email,
            password
        }
        const res = await fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        if (res.ok) {
            onLogin(data)
            history.push("/")
        } else {
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
                        <div className="card-body p-4 p-md-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">BeatMatch Signup</h3>
                            <form onSubmit={handleSignup}>
                                <div className="col-md-6 login mb-4">
    
    
                                </div>
                            <div className="row">
                                <div className="col-md-6 mb-4">
    
                                <div className="form-outline">
                                    <input required type="text" id="username" className="form-control form-control-lg" value={username} onChange={e => setUsername(e.target.value)}/>
                                    <label className="form-label" htmlFor="firstName">Username</label>
                                </div>
    
                                </div>

                                <div className="col-md-6 mb-4">
    
                                <div className="form-outline">
                                    <input required type="text" id="username" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <label className="form-label" htmlFor="email">Email</label>
                                </div>
    
                                </div>

                                <div className="col-md-6 mb-4 pb-2">
    
                                <div className="form-outline">
                                    <input required type="password" id="password" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>
    
                                </div>
                            </div>
    
                            <div className="row">
                                {errors !== [] ? 
                                (<div>
                                    {errors.map((error, index)=> (<p style={{color: 'red'}} key={index}>{error}</p>))}
                                </div>)
                                : null} 
                            </div>
                            <div className="mt-6 pt-2">
                                <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                <br/>
                                <br/>
                                <a className="link"  onClick={handleClick}>Back to Login Form</a>
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


export default Signup