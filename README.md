
#  Patient Round-Robin Telecom App

* [Developer Setup](#developer-setup)


###  Developer Setup

This guide assumes you are running the Node.js server locally on a Linux machine.  It assumes you are running Ubuntu 18+ (though guides can be made available for RHEL/Fedora, Arch, etc on request).

```bash
[user@host]$    git clone https://github.com/wytechcc/PatientTelecomApp
[user@host]$    cd PatientTelecomApp

[user@host]$    sudo apt install npm
[user@host]$    npm install

#  To start the server locally
[user@host]$    npm start
```

###  Generating cert & key

You will need to generate a certificate and key for hosting the server.  To do so, run the following command from the root of the project directory.

```
[user@host]$  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```


