const { Modal } = bootstrap;

export default {
  data() {
    return {
      spkprefix: "spkcc",
    };
  },
  template: `
<div>
<div class="modal fade" id="extend" :tabindex="i" role="dialog" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content bg-darker text-white">
        <div class="modal-header">
            <h5 class="modal-title">Extend {{contract.i}}</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form name="sendhive">
            <div class="modal-body"> <label class="small" for="sendhivefrom">From:</label>
                <div class="input-group mb-3"> <span class="input-group-text bg-dark border-dark text-secondary">@</span> <input class="form-control text-white bg-dark border-dark" type="text" placeholder="Please login" :value="account" readonly> </div> <label class="small" for="sendhiveto">Increase Decentralization:</label>
                <div class="input-group mb-3"> <input class="form-check-input" type="checkbox" role="switch" v-model="up"> </div> <label class="small" for="sendAmount">Amount (Balance: <a href="#/" @click="amount = balance">{{formatNumber(balance, 0, '', ',')}}</a> {{token}}):</label>
                <div class="input-group mb-3"> <input class="form-control text-white bg-dark border-dark" id="sendAmount" type="number" step="1" :min="contract.r" placeholder="Enter amount" v-model="amount"> <span class="input-group-text bg-dark border-dark text-secondary">{{token}}</span> </div> <label class="small" for="sendhivememo">Memo:</label>
                
            </div>
            <div class="modal-footer"> 
            
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> 
            <button type="submit" class="btn btn-primary" @click="extend" data-bs-dismiss="modal">Extend</button> 
            </div>
        </form>
    </div>
</div>
</div>
  <div class="modal fade" id="send" :tabindex="i" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-darker text-white">
              <div class="modal-header">
                  <h5 class="modal-title">Send {{token}}</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form name="sendhive">
                  <div class="modal-body"> <label class="small" for="sendhivefrom">From:</label>
                      <div class="input-group mb-3"> <span class="input-group-text bg-dark border-dark text-secondary">@</span> <input class="form-control text-white bg-dark border-dark" type="text" placeholder="Please login" :value="account" readonly> </div> <label class="small" for="sendhiveto">To:</label>
                      <div class="input-group mb-3"> <span class="input-group-text bg-dark border-dark text-secondary">@</span> <input @blur="accountCheck" class="form-control text-white bg-dark border-dark" type="text" placeholder="Payment recipient" v-model="to"> </div> <label class="small" for="sendAmount">Amount (Balance: <a href="#/" @click="amount = balance / 1000">{{formatNumber((balance)/1000, 3, '.', ',')}}</a> {{token}}):</label>
                      <div class="input-group mb-3"> <input class="form-control text-white bg-dark border-dark" id="sendAmount" type="number" step="0.001" min="0.001" placeholder="Enter amount" v-model="amount"> <span class="input-group-text bg-dark border-dark text-secondary">{{token}}</span> </div> <label class="small" for="sendhivememo">Memo:</label>
                      <div class="input-group mb-3"> <input class="form-control text-white bg-dark border-dark" type="text" placeholder="Include a memo (optional)" v-model="memo"> </div>
                  </div>
                  <div class="modal-footer"> 
                  <div class="me-auto btn-group border border-info rounded px-2 py-1" role="group" aria-label="Transact on Mirror Network Only" v-if="token == 'SPK' || token == 'LARYNX'">
                  <input id="sendmirror" type="checkbox" v-model="test" class="me-2">
                  <label for="sendmirror">Mirror Network Only</label>
                </div>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> 
                  <button :disabled="!valid" type="submit" class="btn btn-primary" @click="send" data-bs-dismiss="modal">Send</button> 
                  </div>
              </form>
          </div>
      </div>
  </div>
  <div class="modal fade" id="elect" :tabindex="i" role="dialog" aria-hidden="true">
    <ul class="sortable-list">
      <li v-for="node in smarkets" class="item" draggable="true">
        <div v-if="typeof node.val_code == 'string'">
          <div class="details">
            <span>{{node.self}}</span>
          </div>
          <i class="uil uil-draggabledots"></i>
        </div>
      </li>
    </ul>
  </div>
  <div class="modal fade" id="delegate" :tabindex="i" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-darker text-white">
              <div class="modal-header">
                  <h5 class="modal-title">Delegate {{token}}</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form name="sendhive">
                  <div class="modal-body"> <label for="sendhivefrom" class="small">From:</label>
                      <div class="input-group mb-3">
                          <div class="input-group-text bg-dark border-secondary text-secondary">@</div> <input class="form-control bg-dark border-secondary text-white" type="text" placeholder="Please login" :value="account" readonly>
                      </div> <label for="sendhiveto" class="small">To:</label>
                      <div class="input-group mb-3" v-if="token == 'LARYNX'"> <span class="input-group-text bg-dark border-secondary text-secondary">@</span> <select class="form-select text-white bg-dark border-secondary" id="datalistOptions" v-model="to">
                              <option value="" disabled selected>Select node operator</option>
                              <option v-for="node in smarkets" :value="node.self">{{node.lastGood >= stats.head_block - 1200 ? '🟩': node.lastGood > stats.head_block - 28800  ? '🟨' : '🟥'}} {{node.self}}</option>
                          </select> </div>
                      <div class="input-group mb-3" v-if="token == 'DLUX'"> <span class="input-group-text bg-dark border-secondary text-secondary">@</span> <input @blur="accountCheck" class="form-control bg-dark border-secondary text-white" type="text" placeholder="Recipient" v-model="to"> </div> <label for="delAmount" class="small">Amount (Balance: <a href="#/" @click="amount = balance / 1000">{{formatNumber((balance)/1000, 3, '.', ',')}}</a> {{token}}):</label>
                      <div class="input-group mb-3"> <input class="form-control bg-dark border-secondary text-white" type="number" step="0.001" id="delAmount" min="0.001" placeholder="Enter amount" v-model="amount"> <span class="input-group-text bg-dark border-secondary text-secondary">{{token}}</span> </div>
                  </div>
                  <div class="modal-footer">
                  <div class="me-auto btn-group border border-info rounded px-2 py-1" role="group" aria-label="Transact on Mirror Network Only" v-if="token == 'SPK' || token == 'LARYNX'">
                  <input id="delegatemirror" type="checkbox" v-model="test" class="me-2">
                  <label for="delegatemirror">Mirror Network Only</label>
                </div>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> <button :disabled="!to" type="submit" class="btn btn-primary" @click="delegate" data-bs-dismiss="modal">Confirm</button> </div>
              </form>
          </div>
      </div>
  </div>
  <div class="modal fade" id="power" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-darker text-white">
              <div class="modal-header">
                  <h5 class="modal-title">{{func}} {{token}}  {{func == 'Election' ? 'Validators' : ''}}</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form name="power">
                  <div class="modal-body"> 
                      <div v-if="func != 'Election'" class="input-group mb-3" id="poweramount"> 
                      <label for="poweramount" class="small">Amount (Balance: <a href="#/" @click="amount = balance / 1000">{{formatNumber((balance)/1000, 3, '.', ',')}}</a> {{token}}):</label>
                        <input class="form-control text-white border-dark bg-dark" type="number" step="0.001" :min="min" :max="formatNumber((balance)/1000, 3, '.', ',')" placeholder="1.000" v-model="amount"> <span class="input-group-text text-secondary border-dark bg-dark">{{token}}</span>
                      </div>
                      <div v-if="func == 'Register a Service'"> <label for="api" class="small">Location (https://ipfs.dlux.io)</label>
                          <div class="input-group mb-3" id="api"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="api"> </div>
                          <label for="peerid" class="small">Unique ID</label>
                          <div class="input-group mb-3" id="peerid"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="id"> </div>
                          <label for="peerid" class="small">Service Type</label>
                          <div class="input-group mb-3" id="type"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="to"> </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="power" data-bs-dismiss="modal">Continue</button>
                          </div>
                      </div>
                      <div v-if="func == 'Register a Service Type'"> <label for="type" class="small">Short Name for Service (IPFS)</label>
                          <div class="input-group mb-3" id="api"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="api"> </div>
                          <label for="peerid" class="small">Full Name for Service (InterPlanetary File System)</label>
                          <div class="input-group mb-3" id="peerid"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="id"> </div>  
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="power" data-bs-dismiss="modal">Continue</button>
                          </div>
                      </div>
                      <div v-if="func == 'Election'">
                      
                      <h3 class="mb-2">Chosen Validators ({{valWorkable.length}}/30)</h3>
                      <div class="d-flex mx-5 justify-content-between align-items-center border-bottom border-secondary py-2 mb-3">
                        <button class="btn btn-success invisible" type="button">Save</button>
                        <h5 class="m-0"> Node (Weight)</h5>
                        <button :class="{'invisible': !difVote}" class="btn btn-success" type="button" @click="valVote()">Save</button>
                      </div>
                      <div class="mb-5">
                      <div v-if="!valWorkable.length">
                        <p>No Validators Added</p>
                      </div>
                        <ul class="mx-5 p-0">
                          <div v-for="(node, index) in valWorkable">
                            <li @dragstart="pick($event, node, index)" @dragover.prevent @dragenter.prevent @drop="move($event, node, index)" class="border border-secondary rounded d-flex align-items-center justify-content-between p-2 my-2 drop-zone" draggable="true" style="cursor: move;">
                              <i class="fa-solid fa-grip-lines ms-3"></i>  
                              <h5 class="m-0">@{{node.self}} ({{formatNumber(((30 - index )/ 30)* 100, 1,  '.', ',')}}%)</h5>
                              <button class="btn btn-primary" @click="sub(node)" type="button"><i class="fa-solid fa-minus"></i></button>
                            </li>
                          </div>
                        </ul>
                      </div>
                      <h3 class="mb-3">Validators</h3>
                        <ul class="mx-5 p-0">
                          <div v-for="node in smarkets">
                            <li v-if="isVal(node)" class="border border-secondary rounded d-flex align-items-center justify-content-between p-2 my-2">
                              <button class="btn btn-primary invisible" type="button"><i class="fa-solid fa-plus"></i></button>
                              <h5 class="m-0">@{{node.self}}</h5>
                              <button :disable="valWorkable.length == 30" class="btn btn-primary" @click="add(node)" type="button"><i class="fa-solid fa-plus"></i></button>
                            </li>
                          </div>
                        </ul>
          
                      </div>
                      <div v-if="func == 'Register a Validator'"> 
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="power" data-bs-dismiss="modal">Continue</button>
                          </div>
                      </div>
                      <div v-if="func == 'Power Up' || func == 'Power Down'">
                          <div class="modal-footer">
                          <div class="me-auto btn-group border border-info rounded px-2 py-1" role="group" aria-label="Transact on Mirror Network Only" v-if="token == 'LARYNX'">
                            <input id="pwrupmirror" type="checkbox" v-model="test" class="me-2">
                            <label for="pwrupmirror">Mirror Network Only</label>
                          </div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="power" data-bs-dismiss="modal">Continue</button>
                          </div>
                      </div>
                  </div>  
              </form>
          </div>
      </div>
  </div>
  <div class="modal fade" id="build" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-darker text-white">
              <div class="modal-header">
                  <h5 class="modal-title">Create Contract</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form name="contract">
                  <div class="modal-body"> <label for="broca" class="small">Balance: {{formatNumber((balance), 0, '', ',')}}</label>
                      <div class="input-group mb-3" id="broca"> <input class="form-control text-white border-dark bg-dark" type="number" step="1" :min="1" :max="balance" placeholder="1.000" v-model="amount"> <span class="input-group-text text-secondary border-dark bg-dark">{{token}}</span> </div>
                      
                      <label for="c_to" class="small">Account to Upload File</label>
                      <div class="input-group mb-3" id="c_to"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="to"> </div>
                      <label for="broker" class="small">IPFS Service Provider</label>
                      <div class="input-group mb-3" id="broker"> <input class="form-control bg-dark border-dark text-white"
                      list="datalistOptions2" id="sponsoredContracts"
                      v-model="broker">
                    <datalist id="datalistOptions2">
                      <option v-for="(account, key) in ipfsproviders" :value="key"></option>
                    </datalist> </div>
                      <label for="ben" class="small">Requested Benificary Amount</label>
                      <div class="input-group mb-3" id="ben"> <input class="form-control text-white border-dark bg-dark" type="number" step="0.01" :min="0" :max="100" v-model="ben_amount"> </div>
                      <label for="ben_to" class="small">Benificiary Account</label>
                      <div class="input-group mb-3" id="ben_to"> <input class="form-control text-white border-dark bg-dark" type="text" v-model="ben_to"> </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="build" data-bs-dismiss="modal">Propose</button>
                      </div>
                      
                  </div>  
              </form>
          </div>
      </div>
  </div>
  <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-darker text-white">
              <div class="modal-header">
                  <h5 v-if="func == 'powercancel'" class="modal-title">Cancel Power Down?</h5>
                  <h5 v-if="func == 'delcancel'" class="modal-title">Remove Delegation</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p v-if="func == 'delcancel'">Do you really want to remove the delegation to @dlux-io?</p>
                  <p v-if="func == 'powercancel'">This will cancel the current power down request. Are you sure?</p>
              </div>
              <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> <button type="button" class="btn btn-primary" @click="confirm" data-bs-dismiss="modal">Continue</button> </div>
          </div>
      </div>
  </div>
  <slot name="trigger"></slot>
</div>`,
  methods: {
    log(event, item){
      console.log(event, item)
    },
    valVote(){
      var op 
      if(this.difVote)op = {
        type: "cja",
        cj: {
          votes: this.voteString,
        },
        id: `${this.spkprefix}_val_vote`,
        msg: `Voting for Validators...`,
        ops: ["getSapi"],
        api: "https://spkinstant.hivehoneycomb.com",
        txid: "val_vote",
      };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    accountCheck() {
      fetch("https://anyx.io", {
        body: `{\"jsonrpc\":\"2.0\", \"method\":\"condenser_api.get_accounts\", \"params\":[[\"${this.to}\"]], \"id\":1}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      })
        .then((r) => {
          return r.json();
        })
        .then((re) => {
          if (re.result.length) this.valid = true;
          else this.valid = false;
        });
    },
    isVal(node){
      return typeof node.val_code == 'string' ? true : false
    },
    add(node){
      if (this.valWorkable.indexOf(node) == -1)this.valWorkable.push(node)
    },
    sub(node){
      for(var i = 0; i < this.valWorkable.length; i++){
        if(this.valWorkable[i].self == node.self){
          this.valWorkable.splice(i, 1)
        }
      }
    },
    pick(evt, node, index){
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', index)
    },
    move(evt, node, index){
      this.valWorkable.splice(index, 0, this.valWorkable.splice(evt.dataTransfer.getData('itemID'), 1)[0])
    },
    buildWorkVotes(){
      const arr = this.valvotes.split('')
      for(var i = 0; i < arr.length; i++){
        this.workVotes.push(`${arr[i]}${arr[i+1]}`)
        i++
      }
    },
    packageWorkVotes(){
      this.valvotes = this.workVotes.join('')
    },
    formatNumber(t, n, r, e) {
      if (typeof t != "number") t = parseFloat(t);
      if (isNaN(t)) return "Invalid Number";
      if (!isFinite(t)) return (t < 0 ? "-" : "") + "infinite";
      (r = r || "."), (e = e || "");
      var u = t < 0;
      t = Math.abs(t);
      var a = (null != n && 0 <= n ? t.toFixed(n) : t.toString()).split("."),
        i = a[0],
        o = 1 < a.length ? r + a[1] : "";
      if (e)
        for (var c = /(\d+)(\d{3})/; c.test(i); )
          i = i.replace(c, "$1" + e + "$2");
      return (u ? "-" : "") + i + o;
    },
    confirm() {
      var op
      if (this.func == "powercancel") {
        if (this.token == "LARYNX")
          op = {
            type: "cja",
            cj: {
              amount: 0,
            },
            id: `${this.spkprefix}_${this.test ? 'T' : ''}power_down`,
            msg: `Canceling Power Down...`,
            ops: ["getSapi"],
            api: "https://spkinstant.hivehoneycomb.com",
            txid: "cancel power down",
          };
      } else if (this.func == "powercancel") {
        if (this.token == "LARYNX")
          op = {
            type: "cja",
            cj: {
              to: this.account,
              amount: 0,
            },
            id: `${this.spkprefix}_${this.test ? 'T' : ''}power_grant`,
            msg: `Canceling Power Down...`,
            ops: ["getSapi"],
            api: "https://spkinstant.hivehoneycomb.com",
            txid: "cancel power down",
          };
      }
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    build() {
      var op;
        if (this.ben_amount){

        }
        op = {
          type: "cja",
          cj: {
            broca: this.amount,
            broker: this.broker,
            to: this.to,
            contract: "0",
          },
          id: `spkcc_channel_open`,
          msg: `Building Contract...`,
          ops: ["getSapi"],
          api: "https://spktest.dlux.io",
          txid: "build_contract",
        };
        if (this.ben_amount > 0 && this.ben_to){
          op.cj.contract = "1"
          op.cj.slots = `${this.ben_to},${parseInt(this.ben_amount * 100)}`
        }
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    send() {
      var op;
      if (this.token == "DLUX")
        op = {
          type: "cja",
          cj: {
            to: this.to,
            amount: parseInt(this.amount * 1000),
            memo: this.memo,
          },
          id: `${this.token.toLowerCase()}_send`,
          msg: `Trying to send ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      else if (this.token == "SPK")
        op = {
          type: "cja",
          cj: {
            to: this.to,
            amount: parseInt(this.amount * 1000),
            memo: this.memo,
          },
          id: `${this.spkprefix}_${this.test ? 'T' : ''}spk_send`,
          msg: `Trying to send ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      else if (this.token == "LARYNX")
        op = {
          type: "cja",
          cj: {
            to: this.to,
            amount: parseInt(this.amount * 1000),
            memo: this.memo,
          },
          id: `${this.spkprefix}_${this.test ? 'T' : ''}send`,
          msg: `Trying to send ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      else if (this.token == "HIVE")
        op = {
          type: "xfr",
          cj: {
            to: this.to,
            hive: this.amount * 1000,
            memo: this.memo,
          },
          txid: "sendhive",
          msg: `Trying to send ${this.token}...`,
          ops: ["getHiveUser"],
        };
      else if (this.token == "HBD")
        op = {
          type: "xfr",
          cj: {
            to: this.to,
            hbd: this.amount * 1000,
            memo: this.memo,
          },
          txid: "sendhbd",
          msg: `Trying to send ${this.token}...`,
          ops: ["getHiveUser"],
        };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    delegate() {
      var op;
      if (this.token == "DLUX")
        op = {
          type: "cja",
          cj: {
            to: this.to,
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.token.toLowerCase()}_power_grant`,
          msg: `Trying to send ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "delegate",
        };
      // else if (this.token == "SPK")
      //   op = {
      //     type: "cja",
      //     cj: {
      //       to: this.to,
      //       amount: parseInt(this.amount * 1000),
      //       memo: this.memo,
      //     },
      //     id: `${this.spkprefix}_spk_send`,
      //     msg: `Trying to send ${this.token}...`,
      //     ops: ["getSapi"],
      //     api: "https://spkinstant.hivehoneycomb.com",
      //     txid: "delegate",
      //   };
      else if (this.token == "LARYNX")
        op = {
          type: "cja",
          cj: {
            to: this.to,
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.spkprefix}_${this.test ? 'T' : ''}power_grant`,
          msg: `Trying to delegate ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "delegate",
        };
      // else if (this.token == "HIVE")
      //   op = {
      //     type: "xfr",
      //     cj: {
      //       to: this.to,
      //       hive: this.amount * 1000,
      //       memo: this.memo,
      //     },
      //     txid: "delegate",
      //     msg: `Trying to send ${this.token}...`,
      //     ops: ["getHiveUser"],
      //   };
      // else if (this.token == "HBD")
      //   op = {
      //     type: "xfr",
      //     cj: {
      //       to: this.to,
      //       hbd: this.amount * 1000,
      //       memo: this.memo,
      //     },
      //     txid: "delegate",
      //     msg: `Trying to send ${this.token}...`,
      //     ops: ["getHiveUser"],
      //   };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    elect(){
      var op
      if (this.token == "SPK" && this.func == "Election")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000), //TODO
          },
          id: `${this.token.toLowerCase()}_val_vote`,
          msg: `Trying to unlock ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    vote(){
      var op
      if (this.token == "SPK" && this.func == "Election")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000), //TODO
          },
          id: `${this.token.toLowerCase()}_val_vote`,
          msg: `Trying to unlock ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    extend(){
      var op
      if (this.token == "BROCA")
        op = {
          type: "cja",
          cj: {
            broca: this.amount,
            id: this.contract.i,
            file_owner: this.contract.t,
            power: this.up ? 1 : 0,
          },
          id: `spkcc_extend`,
          msg: `Trying to unlock ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
    power() {
      var op;
      if (this.token == "DLUX" && this.func == "Power Up")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.token.toLowerCase()}_power_up`,
          msg: `Trying to power up ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      else if (this.token == "DLUX" && this.func == "Power Down")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.token.toLowerCase()}_power_down`,
          msg: `Trying to power down ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      else if (this.token == "LARYNX" && this.func == "Power Down")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `spkcc_${this.test ? 'T' : ''}power_down`,
          msg: `Trying to power down ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      else if (this.token == "LARYNX" && this.func == "Register a Service")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
            type: this.to,
            id: this.id,
            api: this.api,
          },
          id: `spkcc_register_service`,
          msg: `Trying to register a service...`,
          ops: ["getSapi"],
          api: "https://spktest.dlux.io",
          txid: "register_service",
        }
        else if (this.token == "LARYNX" && this.func == "Register a Service Type")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
            type: this.api,
            Long_Name: this.id,
          },
          id: `spkcc_register_service_type`,
          msg: `Trying to register a service...`,
          ops: ["getSapi"],
          api: "https://spktest.dlux.io",
          txid: "register_service_type",
        }
        else if (this.token == "LARYNX" && this.func == "Register a Validator")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `spkcc_validator_burn`,
          msg: `Trying to build validator brand...`,
          ops: ["getSapi"],
          api: "https://spktest.dlux.io",
          txid: "validator_burn",
        }
        else if (this.token == "DLUX" && this.func == "Unlock")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.token.toLowerCase()}_gov_down`,
          msg: `Trying to unlock ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      else if (this.token == "DLUX" && this.func == "Lock")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.token.toLowerCase()}_gov_down`,
          msg: `Trying to lock ${this.token}...`,
          ops: ["getTokenUser"],
          api: "https://token.dlux.io",
          txid: "send",
        };
      else if (this.token == "SPK" && this.func == "Power Up")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000)
          },
          id: `spkcc_spk_up`,
          msg: `Trying to power up ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spktest.dlux.io",
          txid: "spk_power",
        };
      else if (this.token == "LARYNX" && this.func == "Power Up")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.spkprefix}${this.test ? 'T' : ''}_power_up`,
          msg: `Trying to power up ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      else if (this.token == "LARYNX" && this.func == "Unlock")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.spkprefix}${this.test ? 'T' : ''}_gov_down`,
          msg: `Trying to unlock ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      else if (this.token == "LARYNX" && this.func == "Lock Liquidity")
        op = {
          type: "cja",
          cj: {
            amount: parseInt(this.amount * 1000),
          },
          id: `${this.spkprefix}${this.test ? 'T' : ''}_gov_up`,
          msg: `Trying to lock ${this.token}...`,
          ops: ["getSapi"],
          api: "https://spkinstant.hivehoneycomb.com",
          txid: "send",
        };
      // else if (this.token == "HIVE")
      //   op = {
      //     type: "xfr",
      //     cj: {
      //       to: this.to,
      //       hive: this.amount * 1000,
      //       memo: this.memo,
      //     },
      //     txid: "sendhive",
      //     msg: `Trying to send ${this.token}...`,
      //     ops: ["getHiveUser"],
      //   };
      // else if (this.token == "HBD")
      //   op = {
      //     type: "xfr",
      //     cj: {
      //       to: this.to,
      //       hbd: this.amount * 1000,
      //       memo: this.memo,
      //     },
      //     txid: "sendhbd",
      //     msg: `Trying to send ${this.token}...`,
      //     ops: ["getHiveUser"],
      //   };
      if (op) {
        this.$emit("modalsign", op);
      }
    },
  },
  emits: ["modalsign"],
  props: {
    content: {
      required: false,
      default: "",
    },
    stats: {
      default: function () {
        return {
          head_block: 0,
        };
      },
    },
    contract: {
      default: function () {
        return {};
      },
    },
    up: {
      default: 0,
    },
    valvotes: {
      default: ''
    },
    valWorkable:{
      default: function () {
        return [];
      }
    },
    trigger: {
      default: "click",
    },
    i: {
      default: -1,
    },
    id: {
      default: '',
    },
    dis: {
      default: false,
    },
    ipfsproviders: {
      default: function () {
        return {
          "na": "na",
        };
      },
    },
    smarkets: {
      default: function () {
        return {
          na: {
            self: "",
          },
        };
      },
    },
    delay: {
      default: 0,
    },
    html: {
      default: false,
    },
    type: {
      default: "send",
    },
    func: {
      default: "Power Up",
    },
    account: {
      default: "Not Logged In",
    },
    current: {
      default: 'bad',
    },
    token: {
      default: "Dlux",
    },
    to: {
      default: "",
    },
    memo: {
      default: "",
    },
    min: {
      default: "0.001",
    },
    max: {
      default: "",
    },
    balance: {
      default: 0,
    },
    amount: {
      default: 0.001,
    },
    ben_amount: {
      default: "10.00",
    },
    broker: {
      default: "",
    },
    ben_to: {
      default: '',
    },
    api: {
      default: 'https://ipfs.example.com',
    },
    valid: {
      default: false,
    },
    test:{
      default: true,
    },
    customClass: {
      default: "",
    },
    html: {
      default: true,
    },
  },
  computed:{
    difVote: {
      get() {
        return typeof this.current == 'string' ? this.current.split(',')[0] : '' == this.voteString ? false : true
      }
    },
    voteString: {
      get() {
        return this.valWorkable.length > 0 ? this.valWorkable.map(v => v.val_code).join('') : ''
      }
    }
  },
  mounted() {
    var options = this.$props;
    var trigger = this.$slots["trigger"][0].elm;
    var target = this.$el.children[options.type];
    document.getElementById("app").appendChild(target);
    trigger.addEventListener("click", () => {
      var theModal = new Modal(target, () => {});
      theModal.show();
    });
  },
};