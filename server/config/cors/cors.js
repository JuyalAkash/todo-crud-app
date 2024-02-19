const allowlist = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
};

export default corsOptions;
