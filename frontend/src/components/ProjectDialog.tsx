import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (data: { title: string; description: string; status?: string }) => void;
    initial?: { title: string; description: string; status?: string };
    };

    const ProjectDialog: React.FC<Props> = ({ open, onClose, onSave, initial }) => {
    const [title, setTitle] = useState(initial?.title || "");
    const [description, setDescription] = useState(initial?.description || "");
    const [status, setStatus] = useState(initial?.status || "pending");

    React.useEffect(() => {
        if (initial) {
        setTitle(initial.title);
        setDescription(initial.description);
        setStatus(initial.status || "pending");
        } else {
        setTitle("");
        setDescription("");
        setStatus("pending");
        }
    }, [initial, open]);

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>{initial ? "Edit Project" : "Create Project"}</DialogTitle>
        <DialogContent>
            <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{mb:2}} />
            <TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{mt:2}}>
            <MenuItem value="pending">pending</MenuItem>
            <MenuItem value="in-progress">in-progress</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={() => onSave({ title, description, status })}>Save</Button>
        </DialogActions>
        </Dialog>
    );
};

export default ProjectDialog;
