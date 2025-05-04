/**
 * Dashboard Page
 * Main landing page for the AI Fashion Platform
 */

import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardMedia, CardContent,
  Button, Paper, Divider, Chip, CircularProgress, Link
} from '@mui/material';
import {
  AutoAwesome, Groups, Psychology, Architecture, Brush,
  CloudUpload, Update, DeveloperBoard
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { DesignContext } from '../context/DesignContext';

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { getDesigns, designs, loading } = useContext(DesignContext);
  const [featuredDesigns, setFeaturedDesigns] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      if (isAuthenticated) {
        const designsData = await getDesigns(1, 6, { status: 'completed' });
        setFeaturedDesigns(designsData.slice(0, 3));
      } else {
        // Mock data for non-authenticated users
        setFeaturedDesigns([
          {
            _id: '1',
            name: 'Summer Collection Dress',
            mainImage: '/images/design1.jpg',
            category: 'dresses',
            createdAt: new Date().toISOString(),
            creator: { name: 'Designer One' }
          },
          {
            _id: '2',
            name: 'Casual Denim Jacket',
            mainImage: '/images/design2.jpg',
            category: 'outerwear',
            createdAt: new Date().toISOString(),
            creator: { name: 'Designer Two' }
          },
          {
            _id: '3',
            name: 'Minimalist Evening Wear',
            mainImage: '/images/design3.jpg',
            category: 'dresses',
            createdAt: new Date().toISOString(),
            creator: { name: 'Designer Three' }
          }
        ]);
      }
    };

    fetchDesigns();
  }, [isAuthenticated, getDesigns]);

  const features = [
    {
      title: 'Collective Design',
      description: 'Harness the wisdom of crowds with our collective design approach that enables multiple users to collaborate on fashion designs.',
      icon: <Groups fontSize="large" color="primary" />
    },
    {
      title: 'AI-Powered Tools',
      description: 'Use cutting-edge AI tools for object detection, texture rendering, 3D modeling, and pattern extraction.',
      icon: <DeveloperBoard fontSize="large" color="primary" />
    },
    {
      title: 'Real-time Collaboration',
      description: 'See design modifications in real-time as users provide feedback and make changes to the designs.',
      icon: <Update fontSize="large" color="primary" />
    },
    {
      title: 'Intelligent Design Completion',
      description: 'Our AI completes designs based on collective user evaluations, creating the perfect blend of human creativity and machine intelligence.',
      icon: <Psychology fontSize="large" color="primary" />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom component="h1">
                Collective Fashion Design
                <br />
                Powered by AI
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Create, evaluate, and perfect fashion designs together with our
                innovative AI-powered platform that brings collective intelligence to fashion.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  color="secondary"
                  component={RouterLink}
                  to={isAuthenticated ? '/ai-tools' : '/register'}
                  startIcon={<AutoAwesome />}
                >
                  {isAuthenticated ? 'Start Designing' : 'Join Now'}
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white' } }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              <Box 
                component="img"
                src="/images/hero-illustration.png"
                alt="AI Fashion Platform"
                sx={{ 
                  width: '100%',
                  maxWidth: 500,
                  display: 'block',
                  margin: '0 auto',
                  filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.2))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our platform combines collective human intelligence with AI to create
            fashion designs that truly represent what people want.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: 'grey.50',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Steps */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            The Design Process
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            From initial concept to final design, our AI-powered platform streamlines every step of the fashion design process.
          </Typography>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <img 
                src="/images/design-process.svg" 
                alt="Design Process" 
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Box 
                    sx={{ 
                      minWidth: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                  >
                    1
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Design Proposal
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Designers submit initial concepts or the AI generates design suggestions based on current trends and preferences.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Box 
                    sx={{ 
                      minWidth: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                  >
                    2
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Collective Evaluation
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Multiple users provide feedback, ratings, and suggestions for improvements on each design.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Box 
                    sx={{ 
                      minWidth: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                  >
                    3
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      AI-Powered Refinement
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Our AI analyzes collective feedback and automatically refines the design, applying texture, color, and pattern adjustments.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Box 
                    sx={{ 
                      minWidth: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                  >
                    4
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Final Design & Production
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      The completed design is ready for production with pattern extraction, 3D modeling, and manufacturing specifications.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Designs */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Designs
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Explore some of the latest designs created on our platform through collective intelligence and AI.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {featuredDesigns.map((design) => (
              <Grid item xs={12} sm={6} md={4} key={design._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="260"
                    image={design.mainImage || '/images/placeholder.jpg'}
                    alt={design.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      {design.name}
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Chip 
                        label={design.category.charAt(0).toUpperCase() + design.category.slice(1)} 
                        size="small" 
                        sx={{ mr: 1 }} 
                      />
                      <Chip 
                        label="AI Enhanced" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        icon={<AutoAwesome sx={{ fontSize: '0.7rem' }} />}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Created by {design.creator.name} on {new Date(design.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      component={RouterLink} 
                      to={`/designs/${design._id}`} 
                      variant="outlined" 
                      fullWidth
                    >
                      View Design
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={RouterLink} 
            to="/designs" 
            variant="contained" 
            size="large"
          >
            Explore All Designs
          </Button>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Transform Fashion Design?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Join our platform today and become part of the fashion revolution that combines
            human creativity with the power of artificial intelligence.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large" 
              color="secondary"
              component={RouterLink}
              to={isAuthenticated ? '/ai-tools' : '/register'}
            >
              {isAuthenticated ? 'Start Designing' : 'Create Account'}
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white' } }}
            >
              Contact Sales
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
