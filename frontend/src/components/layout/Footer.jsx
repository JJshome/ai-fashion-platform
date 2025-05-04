/**
 * Footer Component
 * Footer for the AI Fashion Platform
 */

import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { AutoAwesome, GitHub, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary">
                AI Fashion Platform
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              A collective design platform powered by artificial intelligence.
              Based on innovative patent technology from Ucaretron Inc.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <GitHub />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <YouTube />
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Platform
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Features
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              AI Tools
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Pricing
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Documentation
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Tutorial
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Support
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Company
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Team
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Partners
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} AI Fashion Platform by Ucaretron Inc. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="inherit" variant="body2">
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
