import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

interface Patient {
  id?: string;
  name: string;
  age: number;
  disease: string;
}

interface PatientState {
  patients: Patient[];
  loading: boolean;
}

const initialState: PatientState = { patients: [], loading: false };

export const addPatient = createAsyncThunk(
  "patient/add",
  async (patient: Patient, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      const data = {
        ...patient,
        userId: user.uid,
      };

      const docRef = await addDoc(collection(db, "patients"), data);

      return { id: docRef.id, ...data };
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchPatients = createAsyncThunk(
  "patient/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
      const q = query(
        collection(db, "patients"),
        where("userId", "==", user.uid),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Patient, "id">),
      }));
    } catch (err: any) {
      console.error("Fetch Error:", err.message);
      return rejectWithValue(err.message);
    }
  },
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      })
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      });
  },
});

export default patientSlice.reducer;
