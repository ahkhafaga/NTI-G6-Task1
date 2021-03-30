const custData = ['custName', 'custBalance']
const newCustomerButton = document.querySelector('#newCustButton')
const showAllButton = document.querySelector('#custButton')
const newCustSection = document.querySelector('#newCustSection')
const addNewButton = document.querySelector('#addNew')
const newCustData = document.querySelector('#newCustSection form')
const customersSection = document.querySelector('#customersSection')
const myFilter = document.querySelector('#filter')
const addElement = function(parent, element, attributes, classes, txt){
    const ele = document.createElement(element)
    parent.appendChild(ele)
    if(classes!="") ele.classList=classes
    if(txt!="") ele.innerText=txt
    attributesTypes = Object.keys(attributes)
    attributesTypes.forEach(attr=>{
        ele.setAttribute(attr, attributes[attr])
    })
    return ele
}
const updateShow = function(){
    document.querySelectorAll('.x').forEach(div=>div.remove())
    showAllCustomers()
}
const deleteButton=function(customer, customers){
    id=customer.custId
    ind = customers.findIndex(customer=>customer.custId==id)
    customers.splice(ind,1)
    setCustomers(customers)
    document.querySelectorAll('.x')[ind].remove()
    //if(tasks.length==0) document.querySelector('#noTasks').classList.remove('d-none')
}
const dipositButton = function(customer,customers){
    value = prompt('Enter amount')
    id=customer.custId
    ind = customers.findIndex(customer=>customer.custId==id)
    customers[ind].custBalance= +customers[ind].custBalance+ +value
    customers[ind].custBalance= JSON.stringify(customers[ind].custBalance)
    setCustomers(customers)
    updateShow()
}
const withdrawButton = function(customer,customers){
    value = prompt('Enter amount')
    id=customer.custId
    ind = customers.findIndex(customer=>customer.custId==id)
    if (parseInt(customers[ind].custBalance) <parseInt(value) ){
        alert('Not enogh Balance')
    }
    else{
        customers[ind].custBalance= +customers[ind].custBalance+ -value
        customers[ind].custBalance= JSON.stringify(customers[ind].custBalance)
        setCustomers(customers)
        updateShow()
    }
}

const showSingleCustomer = function(customer){
    customers = getCustomers()
    div = addElement(customersSection,'div',{},'col-4 x','')
    div1 = addElement(div, 'div',{}, ' p-3','')
    div1.classList.add('border', 'border-primary', 'border-3', 'my-3', 'p-3', 'rounded', 'bg-light')
    addElement(div1, 'h6',{},'','Acc Num : '+customer.custId)
    addElement(div1, 'h5',{},'','Name : '+customer.custName)
    addElement(div1, 'h5',{},'','Balance : '+customer.custBalance)
    btnDelete =addElement(div1, 'button',{},'btn btn-danger mx-2','delete')
    btnDelete.addEventListener('click', function(e){ deleteButton(customer,customers) })
    btnDiposit=addElement(div1,'button',{},'btn btn-success mx-2','Diposit')
    btnDiposit.addEventListener('click', function(e){ dipositButton(customer,customers) })
    btnWithdraw=addElement(div1,'button',{},'btn btn-success mx-2','Withdraw')
    btnWithdraw.addEventListener('click', function(e){ withdrawButton(customer,customers) })
    
}
const showAllCustomers = function(){
    document.querySelectorAll('.x').forEach(div=>div.remove())
    customers = getCustomers()
    if (customers.length!=0){
        customers.forEach(customer => {
            showSingleCustomer(customer)
        })
    }
}
const setCustomers = function(customers){
    localStorage.setItem('customers', JSON.stringify(customers))
}
const getCustomers=function(){
    customers = localStorage.getItem('customers')||'[]'
    return JSON.parse(customers)
}
newCustomerButton.addEventListener('click', function(e){
    newCustSection.classList.toggle('d-none')
})
newCustData.addEventListener('submit',function(e){
    e.preventDefault()
    data={custId:new Date().getTime()}
    custData.forEach(head => data[head] =this.elements[head].value)
    customersData = getCustomers()
    customersData.push(data)
    setCustomers(customersData)
    this.reset()
    //newCustSection.classList.toggle('d-none')
    updateShow()
})
showAllButton.addEventListener('click', function(e){
    if (this.innerText==="Hide All Customers"){
        document.querySelectorAll('.x').forEach(div=>div.remove())
    }
    this.innerText==="Show All Customers"?this.innerText="Hide All Customers":this.innerText="Show All Customers";
    customersSection.classList.toggle('d-none')
    showAllCustomers()
})
myFilter.addEventListener('keyup', function(e){
    searchWord = myFilter.value
    customers = getCustomers()
    document.querySelectorAll('.x').forEach(div=>div.remove())
    let foundCusts = customers.filter(customer => {
        customer.custName.includes(searchWord)
    })
    console.log(foundCusts)
    foundCusts.forEach(found=>showSingleCustomer(found))
})