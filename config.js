const LOCAL_DEV = false; // Set to false when running against the actual server

const config = {
  host: LOCAL_DEV ? "127.0.0.1:4444" : "cpsc484-02.stdusr.yale.internal:8888"
};

export default config;