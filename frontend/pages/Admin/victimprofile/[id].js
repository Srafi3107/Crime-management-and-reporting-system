import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "@/pages/Layout/footer";


const Layout = dynamic(() => import('../../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../../Layout/title'), {
    ssr: false,
  })



export default function Victimprofile()
{
    const router = useRouter();

    
    const [vicid,setvicid]=useState();
    const [Victim_FName, setVictim_FName] = useState("");
    const [Victim_LName, setVictim_LName] = useState("");
    const [VicEmail, setVicEmail] = useState("");
    const [Vicpassword, setVicpassword] = useState("");
    const [Confirm_Vicpassword, setConfirm_Vicpassword] = useState("");
    const [NID_No, setNID_No] = useState();
    const [Phone, setPhone] = useState();
    

  const [CollectedpostData, setCollectedpostData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
 const aid=router.query.id;
  console.info("Victim id line(23)= " + router.query.id); // Working


  useEffect(() => {
    fetchVictimdata();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
          setvicid(router.query.id);
          setVictim_FName(CollectedpostData.Victim_FName);
          setVictim_LName(CollectedpostData.Victim_LName);
          setVicEmail(CollectedpostData.VicEmail);
          setVicpassword(CollectedpostData.Vicpassword);
          setConfirm_Vicpassword(CollectedpostData.Confirm_Vicpassword);
          setNID_No(CollectedpostData.NID_No);
          setPhone(CollectedpostData.phone);
          
         



          console.log("Id:", CollectedpostData.vicid);
          console.log("Fname :", CollectedpostData.Victim_FName);
          console.log("Lname :", CollectedpostData.Victim_LName);
          console.log("email :", CollectedpostData.VicEmail);   
          console.log("Nid No :", CollectedpostData.NID_No);
          console.log("phone :", CollectedpostData.phone);
         
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        Victim_FName && Victim_LName && VicEmail && Vicpassword && Confirm_Vicpassword && NID_No && Phone ;
    
        setIsFormComplete(allFieldsFilled);
      }, [Victim_FName,Victim_LName,VicEmail,Vicpassword,Confirm_Vicpassword,NID_No,Phone]);
      
    
      const fetchVictimdata = async () => {
        try {
          const response = await axios.get(
            // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${aid}`
            "http://localhost:3000/admin/getVictim/" + router.query.id,
            // { withCredentials: true }
          );
          const data = response.data;
          console.info("Fetched Victim Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Admin data:", error);
        }
      };
//PUT method
const onSubmit = async (e)=>{
  e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("Victim_FName", Victim_FName);
  formData.append("Victim_LName", Victim_LName);
  formData.append("Victim Email", VicEmail);
  formData.append("Vicpassword", Vicpassword);
  formData.append("Confirm_Vicpassword", Confirm_Vicpassword);
  formData.append("Nid No", NID_No);
  formData.append("Phone", Phone);

  
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"/admin/updatevictim/" + router.query.id,
      {
        
        Victim_FName:Victim_FName,
        Victim_LName:Victim_LName,
        VicEmail: VicEmail,
        Vicpassword: Vicpassword,
        Confirm_Vicpassword: Confirm_Vicpassword,
        NID_No: NID_No,
        Phone: Phone
      
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (response.data) {
      console.info("Data Has been Updated");
      // TODO: Reload the Page Here
    //   router.push({
    //     pathname: "../Layout//" + router.query.AdminId,
    //   });
    } else {
      console.info("Failed to Update");
    //   router.push({
    //     pathname: "error",
    //   });
    }
  } catch (error) {
    console.error("Error Update", error);
  }

  
  







};


const set_id = (e)=> {
  setvicid(e.target.value);
}
const set_Victim_FName = (e) => {
  setVictim_FName(e.target.value);
};
const set_Victim_LName = (e) => {
  setVictim_LName(e.target.value);
};
const set_email = (e) => {
  setVicEmail(e.target.value);
};
const set_vicpassword = (e) => {
    setVicpassword(e.target.value);
  };
const set_vicConfirmpassword = (e) => {
    setConfirm_Vicpassword(e.target.value);
  };
const set_phone = (e) => {
  setPhone(e.target.value);
};
const set_nid = (e) => {
  setNID_No(e.target.value);
};








return(

<>
<Title page= "Victim Update" />
<Layout />


<h1 className="text-center text-2xl font-bold mb-4">Victim Update</h1>
<form onSubmit={onSubmit} class="max-w-lg mx-auto" >

<div class="form-group">
<label htmlFor="vicid" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">vicid :</label>
 <input 
 type="number"
 id="vicid"
 placeholder={CollectedpostData?.vicid}
 class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
 value={vicid}
//  {...register('vicid', { required: true })} 
 onChange={set_id}
 />
 {/* {errors.vicid && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">Victim Id  is required</p>} */}
</div>

<div class="form-group">
        <label htmlFor="Victim_FName" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Victim_FName :</label>
        <input type="text" 
        placeholder={CollectedpostData?.Victim_FName}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="Victim_FName" 
        value={Victim_FName}
        // {...register('Victim_FName', { required: true })} 
       onChange={set_Victim_FName}
        />
         {/* {errors.Victim_FName && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">FName is required</p>} */}
        </div>
<div class="form-group">
        <label htmlFor="Victim_LName" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Victim_LName :</label>
        <input type="text" 
        placeholder={CollectedpostData?.Victim_FName}
         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="Victim_LName" 
        value={Victim_LName}
       onChange={set_Victim_LName}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div class="form-group">
        <label htmlFor="VicEmail" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"> VicEmail :
        </label>
        <input type="email" 
        placeholder={CollectedpostData?.VicEmail}  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="VicEmail" 
        value={VicEmail}
        onChange={set_email}
        // {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
         {/* {errors.email && (
                    <p>
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'InvalAdminId email address'}
                    </p>
                                      )} */}
        </div>
        <div class="form-group">
        <label htmlFor="Vicpassword" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Vicpassword :</label>
        <input type="password" 
        placeholder={CollectedpostData?.Vicpassword}  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="Vicpassword"  
        value={Vicpassword}
        onChange={set_vicpassword}
        // {...register('password', { required: true })}
        />
          {/* {errors.password && <p >password is required</p>} */}
        </div>
        <div>
        <label htmlFor="Confirm_Vicpassword" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Confirm_Vicpassword :</label>
        <input type="password" 
        placeholder={CollectedpostData?.Confirm_Vicpassword} class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        id="Confirm_Vicpassword"  
        value={Confirm_Vicpassword}
        onChange={set_vicConfirmpassword}
        // {...register('password', { required: true })}
        />
          {/* {errors.password && <p >password is required</p>} */}
        </div>
        <div class="form-group">
        <label htmlFor="NID_No" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">NID_No :</label>
        <input type="number" 
         placeholder={CollectedpostData?.NID_No}  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="NID_No"
        value={NID_No}
        onChange={set_nid}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

        <div class="form-group">
        <label htmlFor="Phone" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Phone :</label>
        <input type="number" 
         placeholder={CollectedpostData?.Phone}  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        id="Phone"
        value={Phone}
        onChange={set_phone}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

       
        

       


       <br/>
        <div className="text-center">
                  <input
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update "
                    class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
         data-drawer-target="drawer-navigation"
         data-drawer-show="drawer-navigation"
         aria-controls="drawer-navigation" 
         align="center"
                  />
                </div>
                <a href="/Admin/Adminprofile" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>
            
         



    </form>
    <Footer/>







</>


)



}
