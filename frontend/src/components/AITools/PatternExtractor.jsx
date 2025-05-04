/**
 * Pattern Extractor Component
 * Part of the AI Design Tools described in the Ucaretron Inc. patent
 * Creates clothing patterns from silhouettes using AI
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Button, CircularProgress, Paper, Grid,
  Card, CardMedia, CardContent, Divider, IconButton, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Collapse, Tabs, Tab
} from '@mui/material';
import {
  UploadFile, Architecture, DataObject, ArrowDownward,
  GetApp, ExpandMore, ExpandLess, CheckCircle, Print
} from '@mui/icons-material';

const PatternPiece = ({ piece, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={piece.image || '/placeholder-pattern.jpg'}
        alt={piece.name}
        sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">{piece.name}</Typography>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Measurements</Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ my: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Dimension</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Width</TableCell>
                    <TableCell align="right">{piece.width} {piece.units}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Height</TableCell>
                    <TableCell align="right">{piece.height} {piece.units}</TableCell>
                  </TableRow>
                  {piece.additionalMeasurements && Object.entries(piece.additionalMeasurements).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                      <TableCell align="right">{value} {piece.units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button startIcon={<GetApp />} size="small">
                Download Pattern
              </Button>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const PatternExtractor = () => {
  const [silhouetteImage, setSilhouetteImage] = useState(null);
  const [silhouettePreview, setSilhouettePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patternData, setPatternData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const fileInputRef = useRef(null);
  
  const handleSilhouetteUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSilhouetteImage(file);
      setSilhouettePreview(URL.createObjectURL(file));
      setPatternData(null); // Reset pattern data when new image is uploaded
    }
  };
  
  const handleExtractPattern = async () => {
    if (!silhouetteImage) return;
    
    setLoading(true);
    
    try {
      // In a real implementation, this would call the backend AI service
      // For demo purposes, simulate with mock data after a delay
      setTimeout(() => {
        const mockPatternData = {
          silhouetteImage: silhouettePreview,
          patternPieces: [
            {
              name: 'Front Panel',
              image: '/patterns/front-panel.jpg',
              width: 60,
              height: 90,
              units: 'cm',
              additionalMeasurements: {
                shoulder: 18,
                chest: 50,
                waist: 46,
                hem: 52
              }
            },
            {
              name: 'Back Panel',
              image: '/patterns/back-panel.jpg',
              width: 62,
              height: 92,
              units: 'cm',
              additionalMeasurements: {
                shoulder: 18,
                back: 45,
                waist: 46,
                hem: 52
              }
            },
            {
              name: 'Sleeve',
              image: '/patterns/sleeve.jpg',
              width: 40,
              height: 60,
              units: 'cm',
              additionalMeasurements: {
                armhole: 25,
                bicep: 32,
                wrist: 20
              }
            },
            {
              name: 'Collar',
              image: '/patterns/collar.jpg',
              width: 45,
              height: 10,
              units: 'cm',
              additionalMeasurements: {
                neck: 42
              }
            }
          ],
          materialRequirements: {
            mainFabric: { amount: 2.5, units: 'meters', width: 150, widthUnits: 'cm' },
            lining: { amount: 1.5, units: 'meters', width: 150, widthUnits: 'cm' },
            interfacing: { amount: 0.5, units: 'meters', width: 90, widthUnits: 'cm' }
          },
          constructionNotes: [
            'Cut two of front panel on fold',
            'Cut two of back panel',
            'Cut two of each sleeve piece',
            'Cut one collar piece on fold',
            'Interface collar piece',
            'Seam allowance: 1.5 cm'
          ]
        };
        
        setPatternData(mockPatternData);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error extracting pattern:', error);
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Pattern Extractor Tool</Typography>
      <Typography variant="body2" gutterBottom>
        Upload a garment silhouette to automatically generate pattern pieces.
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
        >
          Upload Silhouette
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleSilhouetteUpload}
            ref={fileInputRef}
          />
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} /> : <Architecture />}
          onClick={handleExtractPattern}
          disabled={!silhouetteImage || loading}
        >
          {loading ? 'Extracting...' : 'Extract Pattern'}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          {silhouettePreview ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Silhouette</Typography>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={silhouettePreview}
                  alt="Garment Silhouette"
                  sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                />
              </Card>
            </Box>
          ) : (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: '#f5f5f5', 
                height: 300, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <UploadFile sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
                Upload a silhouette image to extract pattern
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </Button>
            </Paper>
          )}
        </Grid>
        
        <Grid item xs={12} md={7}>
          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>
                Analyzing silhouette and generating pattern pieces...
              </Typography>
            </Box>
          )}
          
          {!loading && patternData && (
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Pattern Pieces" />
                  <Tab label="Material Requirements" />
                  <Tab label="Construction Notes" />
                </Tabs>
              </Box>
              
              {/* Pattern Pieces Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {patternData.patternPieces.length} Pattern Pieces Generated
                  </Typography>
                  
                  {patternData.patternPieces.map((piece, index) => (
                    <PatternPiece key={index} piece={piece} index={index} />
                  ))}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Print />}
                    >
                      Print All Pattern Pieces
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      sx={{ ml: 2 }}
                    >
                      Download All
                    </Button>
                  </Box>
                </Box>
              )}
              
              {/* Material Requirements Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Material Requirements
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Material</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Width</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(patternData.materialRequirements).map(([material, details]) => (
                          <TableRow key={material}>
                            <TableCell>{material.charAt(0).toUpperCase() + material.slice(1).replace(/([A-Z])/g, ' $1')}</TableCell>
                            <TableCell>{details.amount} {details.units}</TableCell>
                            <TableCell>{details.width} {details.widthUnits}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    These are approximate measurements. Consider adding extra material for pattern matching and mistakes.
                  </Alert>
                </Box>
              )}
              
              {/* Construction Notes Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Construction Notes
                  </Typography>
                  
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <ol>
                      {patternData.constructionNotes.map((note, index) => (
                        <li key={index}>
                          <Typography paragraph sx={{ mb: 1 }}>{note}</Typography>
                        </li>
                      ))}
                    </ol>
                  </Paper>
                </Box>
              )}
            </Box>
          )}
          
          {!loading && !patternData && silhouettePreview && (
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>
                Ready to Extract Pattern
              </Typography>
              <Typography paragraph sx={{ textAlign: 'center' }}>
                Click "Extract Pattern" to generate pattern pieces from your silhouette image.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Architecture />}
                onClick={handleExtractPattern}
              >
                Extract Pattern
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatternExtractor;
