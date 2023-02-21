import con from "../../Model/db";

export default async function handler(req, res) {
   switch (req.method) { 
       case 'GET':
        try{ 
            const eid = req.query.eid;
            console.log(eid);
            let query=`select * from users19 where recid="${eid}"`;
                  const ans= await con.queryRunner(query);   
              res.send(ans);  
           } 
       catch(err){    
                  console.log(err)     
               }      
               break;  
          case 'POST':   
           try{ 
              const eid = req.body.eid;  
                  console.log(eid)    
                  const query=`select * from users19 where recid="${eid}"` 
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


  