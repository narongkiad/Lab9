<script setup>
import { ref } from "vue";
/* import TheWelcome from "../components/TheWelcome.vue"; */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../main.js";
const menu = ref({ nameTH: "", nameEng: "", price: 0, detail: "" });
const allmenu = ref([]);



async function AddUserData() {
  try {
    const docRef = await addDoc(collection(db, "Firebase"), menu.value);
    console.log("Document written with ID: ", docRef.id);
    alert("เพิ่มเมนูเสร็จสิ้น")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function ShowListMenu() {
  const querySnapshot = await getDocs(collection(db, "Firebase"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    //console.log(doc.id);
    const mydata = ref({ id: doc.id, data: doc.data() });
    allmenu.value.push(mydata.value);
  });
}

async function DeleteMenu(data) {
  if (confirm("ต้องการลบเมนูหรือไม่ ?")) {
    await deleteDoc(doc(db, "Firebase", data));
  }
}

const datamenu = ref();
async function Edit(data2) {
  const docRef = doc(db, "Firebase", data2);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.id, docSnap.data());
    datamenu.value = (docSnap.data())
    menu.value = datamenu.value;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");

  }
}

async function ConfirmMenu(data1) {
  // Add a new document in collection "cities"
  await setDoc(doc(db, "Firebase", data1), menu.value);
  console.log("dddd");
  alert("แก้ไขเสร็จสิ้น");
}
</script>

<template>
  <center>
    <div class="slide">
      <v-carousel show-arrows="hover">
        <v-carousel-item src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-food-seasoning-food-banner-image_169169.jpg" cover></v-carousel-item>

        <v-carousel-item src="https://www.shutterstock.com/image-photo/assortment-cooked-food-vegetables-chicken-260nw-1624168432.jpg" cover></v-carousel-item>

        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
      </v-carousel>
    </div>

    <div>
      <v-text-field label="ชื่อเมนู(ภาษาไทย)" variant="outlined" v-model="menu.nameTH"></v-text-field>
      <v-text-field label="ชื่อเมนู(ภาษาอังกฤษ)" variant="outlined" v-model="menu.nameEng"></v-text-field>
      <v-text-field label="ราคา" variant="outlined" v-model="menu.price"></v-text-field>
      <v-textarea label="detail" variant="outlined" v-model="menu.detail"></v-textarea>
      <div>
        <center>
          <div class="button1"><v-btn prepend-icon="mdi-plus" variant="tonal" @click="AddUserData()"> Addmenu </v-btn>
          </div>
          <div class="button2"><v-btn prepend-icon="mdi-plus" variant="tonal" @click="ShowListMenu()"> Showlistmenu
            </v-btn>
          </div>
        </center>

      </div>

    </div>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            หมายเลขคำสั่งซื้อ
          </th>
          <th class="text-left">
            ชื่อเมนูTH
          </th>
          <th class="text-left">
            ชื่อเมนูENG
          </th>
          <th class="text-left">
            ราคา
          </th>
          <th class="text-left">
            รายละเอียด
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allmenu" :key="item.name">
          <td>{{ item.id }}</td>
          <td>{{ item.data.nameTH }}</td>
          <td>{{ item.data.nameEng }}</td>
          <td>{{ item.data.price }}</td>
          <td>{{ item.data.detail }}</td>
          <v-btn prepend-icon="mdi-file-edit" variant="tonal" @click="Edit(item.id)"> Edit </v-btn>
          <v-btn color="error" prepend-icon="mdi-delete" variant="tonal" @click="DeleteMenu(item.id)"> Delete </v-btn>
          <v-btn prepend-icon="mdi-plus" variant="tonal" @click="ConfirmMenu(item.id)"> Confirmmenu </v-btn>
        </tr>
      </tbody>
    </v-table>
  </center>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.button1 {
  padding: 5px;
}

.button2 {
  padding: 5px;
}

.slide {
  width: 1100px;
  margin: 2rem;
  align-items: center;
}

</style>
