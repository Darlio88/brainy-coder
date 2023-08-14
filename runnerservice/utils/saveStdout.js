import { Solution } from "../config/challengesDB"
export default async function( challengeId,stdout){
  console.log(stdout.split("/n"))
  await Solution.findByIdAndUpdate(challengeId,{stdout:stdout.split("/n").join("/n")})
}