import {db} from "@/firebase";
import {doc, getDoc} from "firebase/firestore";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import userImage from "../../public/assets/icons/user.png";

function ViewMembers({project, members}) {
  const [projectMember, setProjectMember] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      var Member = [];
      for (let i = 0; i < members.length; i++) {
        const docRef = await getDoc(doc(db, "users", members[i]));
        if (docRef.exists()) {
          //   console.log(docRef.data());

          Member.push({
            name: docRef.data().displayName,
            pfp: docRef.data().photoURL,
          });
        } else {
          console.log("No such document!");
        }
      }
      setProjectMember(Member);
    };
    getMembers();
    // console.log(members);
  }, [members]);
  return (
    <div>
      {projectMember.map((member, index) => (
        <div key={index} className=" flex gap-3 my-3 items-center ">
          <div>
            <Image
              src={member.pfp ? member.pfp : userImage}
              alt="user"
              width={32}
              height={32}
              className="rounded-full  "
            />
          </div>
          <div className=" font-normal font-ubuntu text-lg">{member.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ViewMembers;
