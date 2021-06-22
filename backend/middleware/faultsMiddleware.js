// exports.buildQuery = (req, res, next) => {
//   try {
//     let queryString = '';
//     for (let i = 0; i < Object.keys(req.query).length; i++) {
//       queryString += `${req.query[i]
//         .toString()
//         .replace(/}|{|"/g, '')
//         .replace(':', '=')}&`;
//     }
//     req.query = queryString;
//     next();
//   } catch (err) {
//     console.log(err.message);
//   }
// };
