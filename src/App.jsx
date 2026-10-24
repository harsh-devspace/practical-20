import React, { useState, useEffect } from 'react'
import {
  Users, UserPlus, Search, Edit3, Trash2, CheckCircle2,
  RefreshCw, Briefcase, Mail, Phone, DollarSign, LayoutGrid,
  List, X, Sparkles, Filter, ShieldCheck, Code, Layers
} from 'lucide-react'

const INITIAL_EMPLOYEES = [
  { id: 'EMP-1001', name: 'Vikramaditya Rathore', role: 'Staff Software Architect', department: 'Engineering', salary: 145000, email: 'vikram@enterprise.io', phone: '+1 (555) 019-2831', status: 'Active' },
  { id: 'EMP-1002', name: 'Sanya Mukherjee', role: 'Principal UX Designer', department: 'Product Design', salary: 120000, email: 'sanya@enterprise.io', phone: '+1 (555) 019-4820', status: 'Active' },
  { id: 'EMP-1003', name: 'Kabir Bansal', role: 'DevOps & Cloud Engineer', department: 'Infrastructure', salary: 110000, email: 'kabir@enterprise.io', phone: '+1 (555) 019-8812', status: 'On Leave' },
  { id: 'EMP-1004', name: 'Pooja Venkatesh', role: 'Senior Product Manager', department: 'Product', salary: 135000, email: 'pooja@enterprise.io', phone: '+1 (555) 019-3391', status: 'Active' },
  { id: 'EMP-1005', name: 'Devendra Kulkarni', role: 'QA Automation Lead', department: 'Quality Assurance', salary: 98000, email: 'devendra@enterprise.io', phone: '+1 (555) 019-7714', status: 'Active' },
]

export default function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('p20_employees')
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES
  })

  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [toastMessage, setToastMessage] = useState('')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' | 'edit'
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

  const emptyForm = {
    name: '',
    role: '',
    department: 'Engineering',
    salary: '',
    email: '',
    phone: '',
    status: 'Active',
  }
  const [formData, setFormData] = useState(emptyForm)

  // Persist to localStorage to simulate API database storage
  useEffect(() => {
    localStorage.setItem('p20_employees', JSON.stringify(employees))
  }, [employees])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // CREATE
  const handleOpenCreateModal = () => {
    setModalMode('create')
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  // UPDATE
  const handleOpenEditModal = (emp) => {
    setModalMode('edit')
    setSelectedEmployeeId(emp.id)
    setFormData({
      name: emp.name,
      role: emp.role,
      department: emp.department,
      salary: emp.salary,
      email: emp.email,
      phone: emp.phone,
      status: emp.status,
    })
    setIsModalOpen(true)
  }

  // DELETE
  const handleDeleteEmployee = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from employee records?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== id))
      showToast(`Employee ${name} removed successfully.`)
    }
  }

  // FORM SUBMISSION (Create or Update)
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.salary) return

    if (modalMode === 'create') {
      const newEmployee = {
        id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        salary: parseFloat(formData.salary),
      }
      setEmployees([newEmployee, ...employees])
      showToast(`Added new employee: ${newEmployee.name}`)
    } else {
      setEmployees((prev) =>
        prev.map((emp) => {
          if (emp.id === selectedEmployeeId) {
            return {
              ...emp,
              ...formData,
              salary: parseFloat(formData.salary),
            }
          }
          return emp
        })
      )
      showToast(`Updated employee details successfully.`)
    }

    setIsModalOpen(false)
  }

  const departments = ['All', 'Engineering', 'Product Design', 'Infrastructure', 'Product', 'Quality Assurance']

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept
    return matchesSearch && matchesDept
  })

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0)

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Staff<span className="text-cyan-400">Core</span></span>
              <span className="block text-[11px] text-slate-400">Practical 20 • Complete CRUD System</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <UserPlus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>
      </header>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl">
            <CheckCircle2 className="w-4 h-4" /> {toastMessage}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Architecture Checklist Banner */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Full React Concept Integration
              </div>
              <h2 className="text-2xl font-bold text-white">Enterprise Employee CRUD Application</h2>
              <p className="text-sm text-slate-400 mt-1">
                Demonstrates Components, State, Props, Event Handling, Conditional Rendering, List Rendering, Controlled Forms, and Simulated API Integration.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                <div className="text-xl font-bold text-white">{employees.length}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Staff</div>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                <div className="text-xl font-bold text-cyan-400">${(totalPayroll / 1000).toFixed(0)}k</div>
                <div className="text-[10px] text-cyan-300 uppercase font-semibold">Annual Payroll</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ Components</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ useState()</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ Props Flow</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ Event Handlers</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ Conditional UI</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ List Mapping</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ Controlled Forms</span>
            <span className="p-2 bg-slate-800/40 rounded-lg text-center border border-slate-700/40">✓ API / Storage</span>
          </div>
        </div>

        {/* Filter and View Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, role, or EMP ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
            >
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* READ OPERATION: Grid or Table View */}
        {filteredEmployees.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-white font-bold text-base">No Employees Found</h4>
            <p className="text-xs text-slate-400">Try modifying search keywords or department filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">{emp.id}</span>
                      <h4 className="font-bold text-white text-base mt-1">{emp.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{emp.role}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{emp.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-mono text-slate-200">${emp.salary.toLocaleString()} / year</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{emp.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditModal(emp)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-400 font-semibold flex items-center gap-1 transition-all border border-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-400 font-semibold flex items-center gap-1 transition-all border border-rose-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 uppercase text-[11px] font-semibold text-slate-400">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name & Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Compensation</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/30 transition-all">
                    <td className="p-4 font-mono font-bold text-cyan-400">{emp.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{emp.name}</div>
                      <div className="text-[11px] text-slate-400">{emp.role}</div>
                    </td>
                    <td className="p-4">{emp.department}</td>
                    <td className="p-4 font-mono text-emerald-400 font-semibold">${emp.salary.toLocaleString()}</td>
                    <td className="p-4 text-[11px]">
                      <div>{emp.email}</div>
                      <div className="text-slate-500">{emp.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(emp)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Create & Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {modalMode === 'create' ? 'Add New Employee' : 'Edit Employee Profile'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Job Role *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Software Architect"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    >
                      <option>Engineering</option>
                      <option>Product Design</option>
                      <option>Infrastructure</option>
                      <option>Product</option>
                      <option>Quality Assurance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Salary ($ USD) *</label>
                    <input
                      type="number"
                      required
                      min="10000"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="120000"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Probation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="employee@corp.io"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 012-3456"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    {modalMode === 'create' ? 'Create Record' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>React Practical 20 • Complete CRUD Employee Management System</span>
          <span>Components • State • Props • Events • Conditional • Lists • Forms • API</span>
        </div>
      </footer>
    </div>
  )
}
