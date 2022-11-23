import { useEffect, useRef, useMemo, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ActionModal from '../components/Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { setData } from '../store/Actions';
import ActionButton from '../components/Buttons/ActionButton';
import { useSelector } from 'react-redux';
import AgGrid from '../components/Tables/AgGrid';
import apiList from '../services/apiList';
function MainPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [editData, seteditData] = useState({});
  const [showAction, setShowAction] = useState(false);
  const [actionTitle, setActionTitle] = useState(null);
  const [actionBody, setActionBody] = useState(null);
  const petData = useSelector((state) => state.saveData);
  const [label, setlabel] = useState('');
  const [Id, setId] = useState('');
  const [columnDefs] = useState([
    { field: 'name' },
    { field: 'tag' },
    { field: 'status' },
    { field: 'description' },
    {
      field: 'Action',
      maxWidth: 100,
      cellRenderer: function (params) {
        return <BiEdit size={30} style={{cursor:'pointer'}} title={'Click to view/edit'} />
      },
    }
  ]);
  async function fetchData() {
      const response = await apiList.getPetsData()
      if(response){
        setRowData(response)
        if(!label){
          toast.success('Welcome Successfully fetched data!');
        }
      }else{
        toast.error('Something went Wrong!');
      }
    
  }
  useEffect(() => {
    //check if first render
      if (firstRender.current) {
        firstRender.current = false;
        fetchData();
      }
 
    return () => {
      setRowData([]);
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);
  // populate data on edit form
  const EditViewForm = (data) => {
    setlabel('Update')
    setId(data.id)
    let petdata={
      'Name':data.name,
      'Tag':data.tag,
      'Status':data.status,
      'Description':data.description
    }
    seteditData(petdata)
    dispatch(setData({ petData: petdata }));
    // Modal Open//
    showModal('Edit/view Pets Info', [{
      'label': 'Name', 'inputType': 'inputBox', 'value':data.name,'placeHolder': 'Enter Name'
    },
    { 'label': 'Tag', 'inputType': 'inputBox','value':data.tag,'placeHolder': 'Enter Tag' },
    { 'label': 'Status', 'inputType': 'selectBox', 'value':data.status, 'data': [{ label: 'Available', value: 'Available' }, { label: 'Not-Available', value: 'Not-Available' }], 'placeHolder': 'Enter Status' },
    { 'label': 'Description', 'inputType': 'textAreaBox', 'value':data.description, 'placeHolder': 'Enter Description' }]
    )
    // End//
  }
  // Submit Form//
  const submitForm = async (data) => {
    if (data.petData.Name===undefined||data.petData.Name==='') {
      toast.error('Please enter name');
      return;
    }
    if (data.petData.Tag===undefined||data.petData.Tag==='') {
      toast.error('Please enter tag');
      return;
    }
    let requstBody = {
      "name": data.petData.Name,
      "tag": data.petData.Tag,
      "status": data.petData.Status === undefined ? 'Available' : data.petData.Status,
      "description": data.petData.Description
    }
    const response = await apiList.AddNewPet(requstBody)
    if (response.status === 201) {
    toast.success('Successfully added pet data!');
    fetchData();
    hideModal()
    }else{
      toast.error('Something went Wrong!');
    }
   
  }
  // Update Form//
  const updateForm = async (data) => {
    if (data.petData.Name===undefined||data.petData.Name==='') {
      toast.error('Please enter name');
      return;
    }
    if (data.petData.Tag===undefined||data.petData.Tag==='') {
      toast.error('Please enter tag');
      return;
    }
    let requstBody = {
      "name": data.petData.Name,
      "tag": data.petData.Tag,
      "status": data.petData.Status === undefined ? 'Available' : data.petData.Status,
      "description": data.petData.Description
    }
    const response = await apiList.UpdatePet(requstBody,Id)
    if (response.status === 200) {
    toast.success('Successfully updated pet data!');
    fetchData();
    hideModal()
    }else{
      toast.error('Something went Wrong!');
    }
   
  }
  const showModal = (title, body) => {
    setActionTitle(title);
    setActionBody(body);
    setShowAction(true);
  }
  const hideModal = () => {
    setActionTitle(null);
    setActionBody(null);
    setShowAction(false);
    setlabel('')
    seteditData({})
    dispatch(setData({ petData: {} }));
  }
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Heading */}
              <h2 className="text-lg font-semibold text-slate-800 ">Pets Information</h2>

              {/* Right: Adding data */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ActionButton
                  onClick={() => {
                    setlabel('Submit')
                    // Modal Open//
                    showModal('Add Pets Info', [{
                      'label': 'Name', 'inputType': 'inputBox', 'placeHolder': 'Enter Name'
                    },
                    { 'label': 'Tag', 'inputType': 'inputBox', 'placeHolder': 'Enter Tag' },
                    { 'label': 'Status', 'inputType': 'selectBox', 'data': [{ label: 'Available', value: 'Available' }, { label: 'Not-Available', value: 'Not-Available' }], 'placeHolder': 'Enter Status' },
                    { 'label': 'Description', 'inputType': 'textAreaBox', 'placeHolder': 'Enter Description' }]
                    )
                    // End//
                  }
                  }
                  loading={false}
                  customClasses={{
                    'w-full': false,
                    'px-4': true,
                    'py-4': false,
                    'py-2': true,
                    'text-sm': true
                  }}
                  label='Add Data'
                />
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6  ">
              <AgGrid rowData={rowData} columnDefs={columnDefs} autoGroupColumnDef={autoGroupColumnDef} ActionClicked={(event) => { EditViewForm(event) }}></AgGrid>
             
            </div>

          </div>
        </main>


      </div>
      <ActionModal show={showAction} title={actionTitle} editData={editData}body={actionBody} buttonLabel={label} onClicked={() => {label==='Submit'?submitForm(petData):updateForm(petData) }}
        onClose={() => { hideModal() }} />
         <Toaster />
    </div>
  );
}

export default MainPage;