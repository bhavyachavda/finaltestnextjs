import con from "../../Model/db";

export default async function handler(req, res) {
   switch (req.method) { 
       case 'GET':
        try{ 
            const eid = req.query.recid;
            console.log("bhavya", eid);
            const code = req.query.code;
            const firstname = req.query.firstname;
            const lastname = req.query.lastname;
            const email = req.query.email;
            const gender = req.query.gender;
            const hobbies = req.query.hobbies;
            const country = req.query.country;
            console.log(eid);
            let query=`update users19 set code="${code}",firstname="${firstname}", lastname="${lastname}", email="${email}", gender="${gender}", hobbies="${hobbies}", country="${country}" where recid="${eid}"`;
                  const ans= await con.queryRunner(query);   
              res.send(ans);  
           } 
       catch(err){    
                  console.log(err)     
               }      
               break;  
          case 'POST':   
           try{ 
                const eid = req.query.recid;
                console.log("bhavya", eid);
                const code = req.query.code;
                const firstname = req.query.firstname;
                const lastname = req.query.lastname;
                const email = req.query.email;
                const gender = req.query.gender;
                const hobbies = req.query.hobbies;
                const country = req.query.country;  
                  console.log(eid)    
                  const query=`update users19 set code="${code}",firstname="${firstname}", lastname="${lastname}", email="${email}", gender="${gender}", hobbies="${hobbies}", country="${country}" where recid="${eid}"` 
                           // console.log(results);      
                  res.send(ans);      
                  } 
          catch(err){    
                      console.log(err)   
                   }    
                   break;
                     default:   
                     res.status(405).end(`Method ${method} Not Allowed`); 
                       break; 
  }
}

  