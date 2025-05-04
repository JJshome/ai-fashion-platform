/**
 * Model Application Component
 * Part of the AI Design Tools described in the Ucaretron Inc. patent
 * Applies 3D clothing designs to models or avatars
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, CircularProgress, Paper, Grid,
  Card, CardMedia, CardContent, Slider, FormControl,
  InputLabel, Select, MenuItem, IconButton, Tabs, Tab
} from '@mui/material';
import {
  ThreeDRotation, PersonOutline, People,
  Replay, PlayArrow, Pause, Loop, RadioButtonUnchecked
} from '@mui/icons-material';

const ModelApplication = ({ designData }) => {
  const [loading, setLoading] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [selectedModel, setSelectedModel] = useState('default');
  const [selectedPose, setSelectedPose] = useState('standing');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [availableModels, setAvailableModels] = useState([
    { id: 'default', name: 'Default Model', gender: 'female', height: 175 },
    { id: 'male-1', name: 'Male Model 1', gender: 'male', height: 185 },
    { id: 'female-1', name: 'Female Model 1', gender: 'female', height: 170 },
    { id: 'female-2', name: 'Female Model 2', gender: 'female', height: 165 },
    { id: 'child-1', name: 'Child Model', gender: 'neutral', height: 130 },
  ]);
  
  const [availablePoses, setAvailablePoses] = useState([
    { id: 'standing', name: 'Standing' },
    { id: 'walking', name: 'Walking' },
    { id: 'turning', name: 'Turning' },
    { id: 'sitting', name: 'Sitting' },
  ]);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    // Clear any existing animation loop when component unmounts
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setModelData(null); // Reset model data when model changes
  };
  
  const handlePoseChange = (event) => {
    setSelectedPose(event.target.value);
    setIsAnimating(false); // Stop animation when pose changes
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const applyDesignToModel = async () => {
    if (!designData) return;
    
    setLoading(true);
    
    try {
      // In a real implementation, this would call the backend 3D service
      // For demo purposes, simulate with mock data after a delay
      setTimeout(() => {
        const mockModelData = {
          modelId: selectedModel,
          pose: selectedPose,
          views: {
            front: '/3d-models/front-view.jpg',
            side: '/3d-models/side-view.jpg',
            back: '/3d-models/back-view.jpg',
            perspective: '/3d-models/perspective-view.jpg',
          },
          animations: {
            walking: '/3d-models/walking-animation.gif',
            turning: '/3d-models/turning-animation.gif',
          },
          canvasData: {
            model3d: canvasRef.current
          }
        };
        
        setModelData(mockModelData);
        setLoading(false);
      }, 2500);
    } catch (error) {
      console.error('Error applying design to model:', error);
      setLoading(false);
    }
  };
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>3D Model Application</Typography>
      <Typography variant="body2" gutterBottom>
        Apply your fashion design to 3D models and avatars.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Model Settings</Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="model-select-label">Select Model</InputLabel>
              <Select
                labelId="model-select-label"
                value={selectedModel}
                label="Select Model"
                onChange={handleModelChange}
              >
                {availableModels.map((model) => (
                  <MenuItem value={model.id} key={model.id}>
                    {model.name} ({model.height}cm)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="pose-select-label">Select Pose</InputLabel>
              <Select
                labelId="pose-select-label"
                value={selectedPose}
                label="Select Pose"
                onChange={handlePoseChange}
              >
                {availablePoses.map((pose) => (
                  <MenuItem value={pose.id} key={pose.id}>
                    {pose.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button
              variant="contained"
              fullWidth
              startIcon={loading ? <CircularProgress size={20} /> : <ThreeDRotation />}
              onClick={applyDesignToModel}
              disabled={loading || !designData}
            >
              {loading ? 'Applying...' : 'Apply to Model'}
            </Button>
          </Paper>
          
          {modelData && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Controls</Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconButton onClick={toggleAnimation}>
                  {isAnimating ? <Pause /> : <PlayArrow />}
                </IconButton>
                
                <IconButton>
                  <Replay />
                </IconButton>
                
                <IconButton>
                  <Loop />
                </IconButton>
                
                <IconButton>
                  <RadioButtonUnchecked />
                </IconButton>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Rotation Speed
              </Typography>
              <Slider
                defaultValue={30}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
              />
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Animation Speed
              </Typography>
              <Slider
                defaultValue={50}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
              />
            </Paper>
          )}
        </Grid>
        
        <Grid item xs={12} md={8}>
          {!modelData && !loading && (
            <Paper 
              sx={{ 
                p: 3, 
                height: 500, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <ThreeDRotation sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6">3D Model Preview</Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Select a model and pose, then click "Apply to Model" to see your design in 3D.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ThreeDRotation />}
                onClick={applyDesignToModel}
                disabled={loading || !designData}
              >
                Apply to Model
              </Button>
            </Paper>
          )}
          
          {loading && (
            <Paper 
              sx={{ 
                p: 3, 
                height: 500, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h6">Generating 3D Model</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we apply your design to the selected model...
              </Typography>
            </Paper>
          )}
          
          {modelData && (
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="3D View" />
                  <Tab label="Multiple Angles" />
                  <Tab label="Animation" />
                </Tabs>
              </Box>
              
              {/* 3D View Tab */}
              {activeTab === 0 && (
                <Box>
                  <Card sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="500"
                      image={modelData.views.perspective}
                      alt="3D Model View"
                    />
                    <CardContent sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography variant="caption" color="text.secondary">
                        {availableModels.find(m => m.id === selectedModel)?.name} - {availablePoses.find(p => p.id === selectedPose)?.name} Pose
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}
              
              {/* Multiple Angles Tab */}
              {activeTab === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={modelData.views.front}
                        alt="Front View"
                      />
                      <CardContent sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="body2">Front View</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={modelData.views.back}
                        alt="Back View"
                      />
                      <CardContent sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="body2">Back View</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={modelData.views.side}
                        alt="Side View"
                      />
                      <CardContent sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="body2">Side View</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={modelData.views.perspective}
                        alt="Perspective View"
                      />
                      <CardContent sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="body2">Perspective View</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              
              {/* Animation Tab */}
              {activeTab === 2 && (
                <Box>
                  {selectedPose === 'walking' || selectedPose === 'turning' ? (
                    <Card>
                      <CardMedia
                        component="img"
                        height="500"
                        image={modelData.animations[selectedPose]}
                        alt={`${selectedPose} Animation`}
                      />
                    </Card>
                  ) : (
                    <Paper 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        height: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        Animation not available for {selectedPose} pose
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Please select "walking" or "turning" pose to view animation.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        sx={{ mt: 2 }}
                        onClick={() => setSelectedPose('walking')}
                      >
                        Switch to Walking
                      </Button>
                    </Paper>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelApplication;
