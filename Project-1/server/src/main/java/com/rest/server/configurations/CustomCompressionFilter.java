package com.rest.server.configurations;



import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.zip.GZIPOutputStream;
@Configuration
public class CustomCompressionFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String acceptEncoding = httpRequest.getHeader("Accept-Encoding");
        if (acceptEncoding != null && acceptEncoding.contains("gzip")) {
            // Wrapping the response to modify it with gzip compression
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            GZIPOutputStream gzipOutputStream = new GZIPOutputStream(byteArrayOutputStream);
            GZipServletResponseWrapper gzipResponse = new GZipServletResponseWrapper(httpResponse, gzipOutputStream);

            chain.doFilter(request, gzipResponse);

            gzipOutputStream.close();

            byte[] compressedBytes = byteArrayOutputStream.toByteArray();
            httpResponse.addHeader("Content-Encoding", "gzip");
            httpResponse.setContentLength(compressedBytes.length);
            httpResponse.getOutputStream().write(compressedBytes);
        } else {
            chain.doFilter(request, response);
        }
    }

    private static class GZipServletResponseWrapper extends HttpServletResponseWrapper {

        private final GZIPOutputStream gzipOutputStream;
        private final ServletOutputStream servletOutputStream;
        private final PrintWriter printWriter;

        public GZipServletResponseWrapper(HttpServletResponse response, GZIPOutputStream gzipOutputStream) throws IOException {
            super(response);
            this.gzipOutputStream = gzipOutputStream;
            this.servletOutputStream = new ServletOutputStream() {
                @Override
                public boolean isReady() {
                    return false;
                }

                @Override
                public void setWriteListener(WriteListener writeListener) {

                }

                @Override
                public void write(int b) throws IOException {
                    gzipOutputStream.write(b);
                }

                @Override
                public void close() throws IOException {
                    gzipOutputStream.close();
                }
            };
            this.printWriter = new PrintWriter(servletOutputStream);
        }

        @Override
        public ServletOutputStream getOutputStream() {
            return servletOutputStream;
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            return printWriter;
        }

        @Override
        public void flushBuffer() throws IOException {
            printWriter.flush();
            gzipOutputStream.flush();
        }
    }
}
