import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: ""
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activePage, setActivePage] = useState("dashboard")
  useEffect(() => {
    fetchEmployees()
  }, [])
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees`
      )
      setEmployees(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }


  const addEmployee = async () => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add_employee`,
        formData
      )
      fetchEmployees()
      setSuccessMessage(
        "Employee onboarded successfully!"
      )
      setFormData({
        name: "",
        email: "",
        role: "",
        department: ""
      })
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )


return (

  <div className="flex min-h-screen bg-gray-100">

    {/* SIDEBAR */}
    <div className="w-72 bg-blue-900 text-white p-6 flex flex-col">
      <h1 className="text-4xl font-bold mb-10">
        SmartBridge AI
      </h1>
      <nav className="flex flex-col gap-4">
        <button onClick={() => setActivePage("dashboard")}
          className={`p-3 rounded-xl text-left transition
            ${ activePage === "dashboard"
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}>
          Dashboard
        </button>
        <button onClick={() => setActivePage("employees")}
          className={`p-3 rounded-xl text-left transition
            ${ activePage === "employees"
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}>
          Employees
        </button>
        <button onClick={() => setActivePage("ai")}
          className={`p-3 rounded-xl text-left transition
            ${ activePage === "ai"
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}>
          AI Insights
        </button>
        <button onClick={() => setActivePage("reports")}
          className={`p-3 rounded-xl text-left transition
            ${ activePage === "reports"
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}>
          Reports
        </button>
        <button onClick={() => setActivePage("settings")}
          className={`p-3 rounded-xl text-left transition
            ${ activePage === "settings"
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}>
          Settings
        </button>
      </nav>
    </div>


    {/* MAIN CONTENT */}

    <div className="
      flex-1
      p-10
      overflow-x-auto
    ">

      <h1 className="
        text-4xl
        font-bold
        text-gray-800
      ">
        Autonomous Onboarding Coordinator
      </h1>


      <p className="
        mt-3
        text-lg
        text-gray-500
      ">
        AI Powered Employee Onboarding Automation System
      </p>


  {successMessage && (<div className="bg-green-200 text-green-800 p-4 rounded-xl mt-6">
    {successMessage}
          </div>)
      }
{/* DASHBOARD PAGE */}
{activePage === "dashboard" && (
    <div>
      <div className="bg-white mt-10 p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">
          Add New Employee
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Employee Name"
            value={formData.name} onChange={handleChange}
            className="border p-3 rounded-xl"/>
          <input type="email" name="email" placeholder="Employee Email"
            value={formData.email} onChange={handleChange}
            className="border p-3 rounded-xl"/>
          <input type="text" name="role"placeholder="Employee Role"
            value={formData.role} onChange={handleChange}
            className="border p-3 rounded-xl"/>
          <input type="text" name="department" placeholder="Department"
            value={formData.department} onChange={handleChange}
            className="border p-3 rounded-xl"/>
        </div>
        <button onClick={addEmployee}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 
            transition">
          {loading
              ? "Processing..."
              : "Start Onboarding"
          }
        </button>
      </div>


      <div className="
        bg-white
        mt-10
        p-8
        rounded-2xl
        shadow-md
      ">

        <h2 className="
          text-3xl
          font-bold
          mb-6
        ">
          Employee List
        </h2>

        <input

          type="text"

          placeholder="Search employee..."

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(e.target.value)
          }

          className="
            border
            p-3
            rounded-xl
            mb-6
            w-full
          "
        />


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-10
        ">

          <div className="
            bg-gray-50
            p-6
            rounded-2xl
            shadow-md
          ">

            <h2 className="text-2xl font-semibold">
              Total Employees
            </h2>
            <p className="text-4xl mt-4 font-bold text-blue-600">
              {employees.length}
            </p>
          </div>
          <div className="
            bg-gray-50
            p-6
            rounded-2xl
            shadow-md
          ">
            <h2 className="text-2xl font-semibold">
              Completed Onboarding
            </h2>
            <p className="
              text-4xl
              mt-4
              font-bold
              text-green-600
            ">
              {
                employees.filter(
                  emp =>
                    emp.onboarding_status === "Completed"
                ).length
              }
            </p>
          </div>
          <div className="
            bg-gray-50
            p-6
            rounded-2xl
            shadow-md
          ">
            <h2 className="text-2xl font-semibold">
              Pending Employees
            </h2>
            <p className="
              text-4xl
              mt-4
              font-bold
              text-yellow-600
            ">
              {
                employees.filter(
                  emp =>
                    emp.onboarding_status !== "Completed"
                ).length
              }

            </p>

          </div>

        </div>

      </div>
      {/* EMPLOYEE TABLE */}

<div className="overflow-x-auto mt-10">

  <table className="
    min-w-full
    border-separate
    border-spacing-y-3
  ">
    <thead>
      <tr className="bg-blue-100">
        <th className="p-4 text-left rounded-l-xl">
          Name
        </th>
        <th className="p-4 text-left">
          Email
        </th>
        <th className="p-4 text-left">
          Role
        </th>
        <th className="p-4 text-left">
          Department
        </th>
        <th className="p-4 text-left">
          Status
        </th>
        <th className="p-4 text-left rounded-r-xl">
          AI Recommendations
        </th>
      </tr>
    </thead>


    <tbody>

      {
        filteredEmployees.map((employee) => (

          <tr

            key={employee.id}

            className="
              bg-gray-50
              hover:bg-blue-50
              transition
            "
          >

            <td className="p-4 rounded-l-xl">
              {employee.name}
            </td>

            <td className="p-4">
              {employee.email}
            </td>

            <td className="p-4">
              {employee.role}
            </td>

            <td className="p-4">
              {employee.department}
            </td>


            <td className="p-4">

              <span

                className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold

                  ${
                    employee.onboarding_status === "Completed"

                      ? "bg-green-200 text-green-800"

                      : "bg-yellow-200 text-yellow-800"
                  }
                `}
              >

                {employee.onboarding_status}

              </span>

            </td>


            <td className="p-4 rounded-r-xl">
              <div className="
                bg-gradient-to-br
                from-blue-50
                to-indigo-50
                p-4
                rounded-2xl
                text-sm
                whitespace-pre-wrap
                leading-7
                max-h-64
                overflow-y-auto
                border
                border-blue-100
                shadow-sm
              ">
                {employee.ai_recommendations}
              </div>
            </td>

          </tr>

        ))
      }

    </tbody>

  </table>

</div>
    </div>

  )
}


{/* EMPLOYEES PAGE */}

{
  activePage === "employees" && (

    <div className="
      bg-white
      mt-10
      p-8
      rounded-2xl
      shadow-md
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-6
      ">
        Employee Management
      </h2>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        {
          employees.map((employee) => (

            <div

              key={employee.id}

              className="
                border
                rounded-2xl
                p-6
              "
            >

              <h3 className="
                text-2xl
                font-semibold
              ">
                {employee.name}
              </h3>

              <p className="mt-2 text-gray-600">
                {employee.role}
              </p>

              <p className="text-gray-500">
                {employee.department}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  )
}


{/* AI PAGE */}
{ activePage === "ai" && (
    <div className="
      bg-white
      mt-10
      p-8
      rounded-2xl
      shadow-md">
      <h2 className="
        text-3xl
        font-bold
        mb-6">
        AI Insights
      </h2>
     <div className="
  grid
  grid-cols-1
  gap-6">
  { employees.map((employee) => (
      <div
        key={employee.id}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border
          border-blue-100">
        <h3 className="text-2xl font-bold mb-3">
          {employee.name}
        </h3>
        <p className="mb-2 text-gray-600">
          {employee.role}
        </p>
        <div className="whitespace-pre-wrap leading-7 text-gray-700">
          {employee.ai_recommendations}
        </div>
      </div>
    ))
  }
</div>
</div>
  )
}


{/* REPORTS PAGE */}

{
  activePage === "reports" && (

    <div className="
      bg-white
      mt-10
      p-8
      rounded-2xl
      shadow-md
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-6
      ">
        Reports
      </h2>

      <div className="
  overflow-x-auto
">

  <table className="
    min-w-full
    border-separate
    border-spacing-y-3
  ">

    <thead>

      <tr className="bg-blue-100">

        <th className="p-4 text-left">
          Employee
        </th>

        <th className="p-4 text-left">
          Department
        </th>

        <th className="p-4 text-left">
          Role
        </th>

        <th className="p-4 text-left">
          Status
        </th>

      </tr>

    </thead>


    <tbody>

      {
        employees.map((employee) => (

          <tr

            key={employee.id}

            className="bg-gray-50"
          >

            <td className="p-4">
              {employee.name}
            </td>

            <td className="p-4">
              {employee.department}
            </td>

            <td className="p-4">
              {employee.role}
            </td>

            <td className="p-4">

              <span className={`
                px-3
                py-1
                rounded-full
                text-sm
                ${
                  employee.onboarding_status === "Completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
                }
              `}>
                {employee.onboarding_status}
              </span>
            </td>
          </tr>
        ))
      }

    </tbody>

  </table>

</div>

    </div>

  )
}


{/* SETTINGS PAGE */}

{
  activePage === "settings" && (

    <div className="
      bg-white
      mt-10
      p-8
      rounded-2xl
      shadow-md
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-6
      ">
        Settings
      </h2>

      <div className="
  flex
  flex-col
  gap-6
">

  <div>

    <label className="
      block
      text-lg
      font-medium
      mb-2
    ">
      Company Name
    </label>

    <input

      type="text"

      defaultValue="SmartBridge AI"

      className="
        border
        p-3
        rounded-xl
        w-full
      "
    />

  </div>


  <div>

    <label className="
      block
      text-lg
      font-medium
      mb-2
    ">
      HR Email
    </label>

    <input

      type="email"

      defaultValue="hr@smartbridge.com"

      className="
        border
        p-3
        rounded-xl
        w-full
      "
    />

  </div>


  <button className="
    bg-blue-600
    text-white
    px-6
    py-3
    rounded-xl
    hover:bg-blue-700
    transition
    w-fit
  ">

    Save Settings

  </button>

</div>

    </div>

  )
}

    </div>

  </div>

)
}
export default App