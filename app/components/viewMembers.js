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
          console.log(docRef.data());

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
    <div className=" p-4">
      <div className=" font-doasis my-2 font-bold text-2xl text-center">
        Members
      </div>
      <div className="flex flex-col gap-2 my-4">
        {projectMember.map((member, index) => (
          <div className=" flex gap-2 items-center ">
            <div>
              <div className=" relative w-8 h-8">
                <Image
                  src={member.pfp ? member.pfp : userImage}
                  alt="user"
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
            <div className=" font-normal font-ubuntu text-lg">
              {member.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMembers;
