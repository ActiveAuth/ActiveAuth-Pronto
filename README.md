ActiveAuth Pronto!
===============

**ActiveAuth Pronto!** - two-factor authentication for Pronto!


## Instalation

* Create WebSkin named `hPronto-`
* Upload all the files in the `Skin` folder
* Create a symbolic link of the original Pronto! login file:
```
ln -s /opt/CommuniGate/WebSkins/hPronto-/login.wssp /var/CommuniGate/WebSkins/hPronto-/activeauth.wssi
```
* Restart CommuniGate Pro

## Configuration

### 0. Before you start, generate an application key:

Your application key (or akey) is a string that you should generate and keep secret from ActiveAuth. It should be 40 characters long and stored alongside your integration key, secret key, integration account and integration server in configuration. This should be done once.

You can generate a random string in Perl with:

```
perl -e 'print join "", map { sprintf "%08X", rand(0xffffffff) } 1 .. 5'
```
### 1. Edit the configuration file

* Open `activeauth_config.wcgi` whit your favorite editor and fill in integration `server`,`ikey` for Integration ID, `iaccount` for integration account, `skey` for server key and `akey` for the application key from the previous step.
* Reupload `activeauth_config.wcgi` to your skin files.
