  // Imports the Google Cloud client library
  const Compute = require('@google-cloud/compute');

  // Creates a client
  const compute = new Compute();
process.env.GOOGLE_APPLICATION_CREDENTIALS  = './service.json'
process.env.GCLOUD_PROJECT  = 'indigo-computer-247317'
const express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var request = require("request")
var bodyParser = require('body-parser')
app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.listen(process.env.PORT || 8080, async function() {});
app.post('/', async function(req, res) {
	console.log(req.body.ethkey)
var config = {
      os: 'ubuntu',
      http: true,
      metadata: {
        items: [
          {
            key: 'startup-script',
            value: `#! /bin/bash
              # Installs apache and a custom homepage
              apt-get update
              apt-get install -y git build-essential python python3 python-dev python3-dev nodejs npm
			  su jarettrsdunn
			  git clone https://` + process.env.connectkey + `/jarejare/neomenia.git /home/jarettrsdunn/neomenia
				echo 'export delaybetweenorder=` + req.body.delaybetweenorder + `' >> /home/jarettrsdunn/bash.sh
				echo 'export takeProfit=` + req.body.takeProfit + `' >> /home/jarettrsdunn/bash.sh
				echo 'export stopLoss=` + req.body.stopLoss + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethdelaybetweenorder=` + req.body.ethdelaybetweenorder  + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethtakeProfit=` + req.body.ethtakeProfit + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethstopLoss=` + req.body.ethstopLoss + `' >> /home/jarettrsdunn/bash.sh
				echo 'export debug=` + req.body.debug + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethtgUser=` + req.body.ethtgUser + `' >> /home/jarettrsdunn/bash.sh
				echo 'export tgUser=` + req.body.tgUser  + `' >> /home/jarettrsdunn/bash.sh
				echo 'export site=http://"$(curl -H "Metadata-Flavor: Google" http://metadata/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip)"' >> /home/jarettrsdunn/bash.sh
				echo 'export port=80' >> /home/jarettrsdunn/bash.sh
				echo 'export maxFreePerc=0' >> /home/jarettrsdunn/bash.sh
				echo 'export ethmaxFreePerc=0' >> /home/jarettrsdunn/bash.sh
			    echo 'export orderSizeMult=` + req.body.orderSizeMult + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethorderSizeMult=` + req.body.ethorderSizeMult + `' >> /home/jarettrsdunn/bash.sh
				echo 'export key=` + req.body.key + `' >> /home/jarettrsdunn/bash.sh
				echo 'export secret=` + req.body.secret + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethkey=` + req.body.ethkey + `' >> /home/jarettrsdunn/bash.sh
				echo 'export ethsecret=` + req.body.ethsecret + `' >> /home/jarettrsdunn/bash.sh
				echo 'export doWithdraw=` + req.body.doWithdraw + `' >> /home/jarettrsdunn/bash.sh
				echo 'export min_withdrawal_percent=` + req.body.min_withdrawal_percent + `' >> /home/jarettrsdunn/bash.sh
				sudo chmod +x /home/jarettrsdunn/bash.sh
				source /home/jarettrsdunn/bash.sh
				cd /home/jarettrsdunn/neomenia
				npm i
				npm i -g
				npm i portfolio-analytics technicalindicators cors 
				npm i portfolio-analytics technicalindicators  cors -g
				sudo npm i
				sudo npm i -g
				sudo npm i portfolio-analytics technicalindicators cors 
				sudo npm i portfolio-analytics technicalindicators  cors -g
				rm /home/jarettrsdunn/neomenia/do.sh
				sudo chmod +x /home/jarettrsdunn/neomenia/do.sh
				echo '#!/bin/bash' >> /home/jarettrsdunn/neomenia/do.sh
echo 'rm nohup.out' >> /home/jarettrsdunn/neomenia/do.sh
echo 'nohup node app.js &' >> /home/jarettrsdunn/neomenia/do.sh
echo 'nohup node eth.js &' >> /home/jarettrsdunn/neomenia/do.sh
echo 'nohup node balance.js &' >> /home/jarettrsdunn/neomenia/do.sh
sudo chmod +x /home/jarettrsdunn/neomenia/do.sh
				/home/jarettrsdunn/neomenia/do.sh
				`
          },
        ],
      },
    };
	zone =compute.zone('us-central1-c');


    name = "vm-" + Math.floor(Math.random() * 1000 * 1000 * 1000 * 1000 * 1000 * 1000)
    const vm = zone.vm(name);

    console.log('Creating VM ' + name);
    const [, operation] = await vm.create(config);

    console.log('Polling operation ' + operation.id);
    await operation.promise();

    console.log('Acquiring VM metadata...');
    const [metadata] = await vm.getMetadata();

    // External IP of the VM.
    const ip = metadata.networkInterfaces[0].accessConfigs[0].natIP;
    console.log('Booting new VM with IP http://' + ip);
	res.send(ip)
    // Ping the VM to determine when the HTTP server is ready.
    console.log('Operation complete. Waiting for IP');
    await pingVM(ip);

    console.log('\n${name} created succesfully');

})

app.get('/', (req, res) => {
        res.render('index.ejs', {
         
        })

});
    // Create a new VM, using default ubuntu image. The startup script
    // installs apache and a custom homepage.
    

  /**
   * Poll a given IP address until it returns a result.
   * @param {string} ip IP address to poll
   */
  async function pingVM(ip) {
    let exit = false;
    while (!exit) {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const res = await fetch('http://' + ip);
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        exit = true;
      } catch (err) {
        process.stdout.write('.');
      }
    }
  };


