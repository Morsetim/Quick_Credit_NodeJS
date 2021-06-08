import loansData from '../../models/db';


const checkAdmin = (req, res, next) => {
  const { userId } = req.decoded;
  loansData.query(`SELECT isAdmin FROM users WHERE id = ${userId}`)
    .then(isAdmin => {
      if (isAdmin.rows[0].isadmin === false){
       return res.json({
          message: 'Permission denied'
        })
      }
      next();
    })
}

export default checkAdmin;